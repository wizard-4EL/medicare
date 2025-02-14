import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc, onSnapshot, query, where, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/config';

function VideoCallSystem({ selectedUser, onEndCall }) {
  const [callStatus, setCallStatus] = useState(null); // null, 'incoming', 'outgoing', 'connected'
  const [currentCall, setCurrentCall] = useState(null);
  const [roomName, setRoomName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!auth.currentUser) {
      setError('No authenticated user');
      return;
    }

    // Listen for both incoming calls and call status updates
    const callsRef = collection(db, 'calls');
    const incomingCallsQuery = query(
      callsRef,
      where('receiverId', '==', auth.currentUser.uid),
      where('status', '==', 'pending')
    );

    const outgoingCallsQuery = query(
      callsRef,
      where('callerId', '==', auth.currentUser.uid)
    );

    // Listen for incoming calls
    const incomingUnsubscribe = onSnapshot(incomingCallsQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const callData = change.doc.data();
          setCurrentCall({ id: change.doc.id, ...callData });
          setCallStatus('incoming');
          setRoomName(callData.roomName);
        }
      });
    });

    // Listen for call status updates (both incoming and outgoing)
    const outgoingUnsubscribe = onSnapshot(outgoingCallsQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const callData = change.doc.data();
        
        // Handle call status updates
        if (change.type === 'modified') {
          if (callData.status === 'accepted') {
            setCallStatus('connected');
            setRoomName(callData.roomName);
            setCurrentCall({ id: change.doc.id, ...callData });
          } else if (callData.status === 'rejected' || callData.status === 'ended') {
            handleEndCall();
          }
        }
        // Handle call removal
        else if (change.type === 'removed') {
          handleEndCall();
        }
      });
    });

    return () => {
      incomingUnsubscribe();
      outgoingUnsubscribe();
    };
  }, []);

  const initiateCall = async () => {
    if (!selectedUser || !auth.currentUser) {
      setError('Cannot initiate call - missing user information');
      return;
    }

    const roomName = `MedicalMeeting-${auth.currentUser.uid}-${selectedUser.id}-${Date.now()}`;
    
    try {
      const callRef = await addDoc(collection(db, 'calls'), {
        callerId: auth.currentUser.uid,
        callerName: auth.currentUser.displayName,
        receiverId: selectedUser.id,
        receiverName: selectedUser.username,
        status: 'pending',
        roomName,
        timestamp: new Date().toISOString()
      });

      setCurrentCall({ 
        id: callRef.id, 
        roomName,
        callerId: auth.currentUser.uid,
        status: 'pending'
      });
      setCallStatus('outgoing');
      setRoomName(roomName);
      setError(null);

    } catch (error) {
      console.error('Error initiating call:', error);
      setError('Failed to initiate call');
    }
  };

  const acceptCall = async () => {
    if (!currentCall) {
      setError('No active call to accept');
      return;
    }

    try {
      await updateDoc(doc(db, 'calls', currentCall.id), {
        status: 'accepted'
      });
      
      setCallStatus('connected');
      setError(null);
    } catch (error) {
      console.error('Error accepting call:', error);
      setError('Failed to accept call');
    }
  };

  const rejectCall = async () => {
    if (!currentCall) {
      setError('No active call to reject');
      return;
    }

    try {
      await updateDoc(doc(db, 'calls', currentCall.id), {
        status: 'rejected'
      });
      
      handleEndCall();
    } catch (error) {
      console.error('Error rejecting call:', error);
      setError('Failed to reject call');
    }
  };

  const handleEndCall = async () => {
    if (currentCall) {
      try {
        // Only delete if we're the caller or if the call is already ended/rejected
        if (currentCall.callerId === auth.currentUser.uid || 
            currentCall.status === 'ended' || 
            currentCall.status === 'rejected') {
          await deleteDoc(doc(db, 'calls', currentCall.id));
        } else {
          // Otherwise just update the status
          await updateDoc(doc(db, 'calls', currentCall.id), {
            status: 'ended'
          });
        }
      } catch (error) {
        console.error('Error ending call:', error);
        setError('Failed to end call');
      }
    }
    
    setCallStatus(null);
    setCurrentCall(null);
    setRoomName('');
    onEndCall();
  };

  return (
    <div className="w-full h-full relative">
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {callStatus === 'incoming' && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-4">
              Incoming call from {currentCall?.callerName}
            </h3>
            <div className="flex space-x-4">
              <button
                onClick={acceptCall}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={rejectCall}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {callStatus === 'outgoing' && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-4">
              Calling {selectedUser?.username}...
            </h3>
            <button
              onClick={handleEndCall}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {callStatus === 'connected' && (
        <>
          <iframe
            title="Video Conference"
            src={`https://meet.jit.si/${roomName}#config.disableDeepLinking=true`}
            allow="camera; microphone; fullscreen; display-capture"
            className="w-full h-full rounded-lg"
          />
          <button
            onClick={handleEndCall}
            className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            End Call
          </button>
        </>
      )}

      {!callStatus && selectedUser && (
        <div className="flex items-center justify-center h-full">
          <button
            onClick={initiateCall}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
          >
            <span>Call {selectedUser.username}</span>
          </button>
        </div>
      )}

      {!callStatus && !selectedUser && (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Select a user to start a video call</p>
        </div>
      )}
    </div>
  );
}

export default VideoCallSystem;