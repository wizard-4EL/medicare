import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs, query, where, orderBy, addDoc, onSnapshot, writeBatch } from 'firebase/firestore';
import { FaSearch, FaPhoneAlt, FaPaperPlane } from 'react-icons/fa';
import {
  CgClipboard,
  CgDetailsMore,
  CgTemplate,
  CgMail,
  CgProfile,
  CgLogIn,
} from 'react-icons/cg';
import { RiSettings2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { db, auth } from '../firebase/config';

function VideoConference({ roomName, onEndCall }) {
  return (
    <div className="w-full h-full relative">
      <iframe
        title="Video Conference"
        src={`https://meet.jit.si/${roomName}#config.disableDeepLinking=true`}
        allow="camera; microphone; fullscreen; display-capture"
        className="w-full h-full rounded-lg"
      />
      <button
        onClick={onEndCall}
        className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
      >
        End Call
      </button>
    </div>
  );
}

// Chat Message Component
const ChatMessage = ({ message, isCurrentUser }) => (
  <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`max-w-[70%] ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-lg px-4 py-2`}>
      <p className="text-sm">{message.text}</p>
      <span className="text-xs opacity-70">
        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  </div>
);

function Messages() {
  const [activeTab, setActiveTab] = useState("messages");
  const [inCall, setInCall] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);
        const getRandomProfilePic = () => {
          const styles = ['adventurer', 'adventurer-neutral', 'avataaars', 'big-ears', 'big-ears-neutral', 'big-smile', 'bottts', 'croodles', 'fun-emoji'];
          const randomStyle = styles[Math.floor(Math.random() * styles.length)];
          return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${Math.random()}`;
        };

        const usersList = userSnapshot.docs.map(doc => {
          const userData = doc.data();
          return {
            id: doc.id,
            ...userData,
            // Use existing image if available, otherwise generate random avatar
            image: userData.profilePicture || getRandomProfilePic()
          };
        });
        setUsers(usersList);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  // Subscribe to messages when a user is selected
  // Track unread messages count for each user
  const [unreadCounts, setUnreadCounts] = useState({});

  // Subscribe to all chats to get unread counts
  useEffect(() => {
    if (!auth.currentUser) return;

    const unsubscribes = [];
    const currentUserId = auth.currentUser.uid;

    users.forEach(user => {
      const chatId = [currentUserId, user.id].sort().join('_');
      const messagesRef = collection(db, "chats", chatId, "messages");
      const q = query(
        messagesRef,
        where("receiver", "==", currentUserId),
        where("read", "==", false)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setUnreadCounts(prev => ({
          ...prev,
          [user.id]: snapshot.docs.length
        }));
      });

      unsubscribes.push(unsubscribe);
    });

    return () => unsubscribes.forEach(unsubscribe => unsubscribe());
  }, [users]);

  // Subscribe to selected chat messages
  useEffect(() => {
    if (!selectedUser || !auth.currentUser) return;

    setChatLoading(true);
    const chatId = [auth.currentUser.uid, selectedUser.id].sort().join('_');
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const messagesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesList);
      setChatLoading(false);

      // Mark messages as read when chat is opened
      const unreadMessages = snapshot.docs.filter(doc => 
        doc.data().receiver === auth.currentUser.uid && !doc.data().read
      );

      const batch = writeBatch(db);
      unreadMessages.forEach(doc => {
        batch.update(doc.ref, { read: true });
      });

      if (unreadMessages.length > 0) {
        await batch.commit();
      }
    });

    return () => unsubscribe();
  }, [selectedUser]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser || !auth.currentUser) return;

    const chatId = [auth.currentUser.uid, selectedUser.id].sort().join('_');
    const messagesRef = collection(db, "chats", chatId, "messages");

    try {
      await addDoc(messagesRef, {
        text: newMessage,
        sender: auth.currentUser.uid,
        receiver: selectedUser.id,
        timestamp: new Date().toISOString(),
        read: false
      });
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    if (activeTab === "calls") {
      const newRoom = `MedicalMeeting-${user.id}-${Date.now()}`;
      setRoomName(newRoom);
      setInCall(true);
    } else {
      setInCall(false);
    }
  };

  const handleEndCall = () => {
    setInCall(false);
  };

  const filteredUsers = users.filter(user => 
    // Filter out current user and apply search query
    user.id !== auth.currentUser?.uid && 
    (user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentUser = auth.currentUser;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/5 bg-blue-800 text-white p-6 flex flex-col justify-between">
        {/* Sidebar content remains the same */}
        <div>
          <h2 className="text-3xl font-bold mb-6">MEDICARE</h2>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700 cursor-pointer">
              <CgDetailsMore />
              <span>Dashboard</span>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700 cursor-pointer">
              <Link to="/appointments" className="flex items-center space-x-2">
                <CgTemplate />
                <span>Appointments</span>
              </Link>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700 cursor-pointer">
              <Link to="/patient" className="flex items-center space-x-2">
                <CgProfile />
                <span>Patients</span>
              </Link>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700 cursor-pointer">
              <Link to="/report" className="flex items-center space-x-2">
                <CgClipboard />
                <span>Report</span>
              </Link>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded-lg bg-blue-900 cursor-pointer">
              <Link to="/message" className="flex items-center space-x-2">
                <CgMail />
                <span>Messages</span>
              </Link>
            </li>
            <li className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-700 cursor-pointer">
              <Link to="/settings" className="flex items-center space-x-2">
                <RiSettings2Line />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </div>
        <button className="flex items-center space-x-2 p-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors">
          <CgLogIn />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Messages</h1>
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:ring focus:border-blue-300 w-full transition duration-200"
            />
            <FaSearch className="absolute top-2 left-3 text-gray-400" />
          </div>
        </header>

        {/* Panels */}
        <div className="flex flex-col lg:flex-row h-[calc(100%-4rem)]">
          {/* Left Panel: Users List */}
          <div className="lg:w-1/3 bg-white shadow-md rounded-lg p-4 mb-4 lg:mb-0 lg:mr-4 overflow-y-auto">
            {/* Tabs */}
            <div className="flex justify-around border-b pb-2 mb-4">
              <span
                onClick={() => {
                  setActiveTab("messages");
                  setInCall(false);
                  setSelectedUser(null);
                }}
                className={`cursor-pointer font-semibold pb-1 border-b-2 transition-colors ${
                  activeTab === "messages"
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-600 border-transparent"
                }`}
              >
                Messages
              </span>
              <span
                onClick={() => {
                  setActiveTab("calls");
                  setInCall(false);
                  setSelectedUser(null);
                }}
                className={`cursor-pointer font-semibold pb-1 border-b-2 transition-colors ${
                  activeTab === "calls"
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-600 border-transparent"
                }`}
              >
                Video Calls
              </span>
            </div>

            {/* Loading and Error States */}
            {loading && (
              <div className="text-center py-4 text-gray-600">Loading users...</div>
            )}
            {error && (
              <div className="text-center py-4 text-red-600">{error}</div>
            )}

            {/* Users List */}
            {!loading && !error && filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className={`flex items-center justify-between p-2 my-1 rounded-md cursor-pointer transition-colors hover:bg-gray-100 ${
                  selectedUser?.id === user.id ? "bg-gray-200" : ""
                }`}
              >
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={user.image}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {unreadCounts[user.id] > 0 && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCounts[user.id]}
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold">{user.username}</h3>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                {/* Last message time */}
                {messages.length > 0 && selectedUser?.id === user.id && (
                  <span className="text-xs text-gray-400">
                    {new Date(messages[messages.length - 1].timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Right Panel: Chat/Video Area */}
          <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            {activeTab === "calls" && inCall ? (
              <VideoConference roomName={roomName} onEndCall={handleEndCall} />
            ) : selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center">
                  <img
                    src={selectedUser.image}
                    alt={selectedUser.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-3">
                    <h3 className="font-semibold">{selectedUser.username}</h3>
                    <p className="text-sm text-gray-500">{selectedUser.email}</p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  {chatLoading ? (
                    <div className="text-center py-4">Loading messages...</div>
                  ) : messages.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">No messages yet</div>
                  ) : (
                    messages.map((message) => (
                      <ChatMessage
                        key={message.id}
                        message={message}
                        isCurrentUser={message.sender === currentUser?.uid}
                      />
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <FaPaperPlane className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                {activeTab === "calls"
                  ? "Select a user to start a video call"
                  : "Select a user to start a conversation"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;