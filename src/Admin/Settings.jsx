import React, { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { updateProfile, updateEmail, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { db, auth } from '../firebase/config';
import AdminSidebar from '../Components/AdminSidebar';  
import { 
  RiUser3Line,
  RiMailLine,
  RiLockPasswordLine,
  RiPhoneLine,
  RiSaveLine,
  RiEditLine,
  RiCheckLine,
  RiCloseCircleLine,
  RiInformationLine,
  RiShieldUserLine
} from 'react-icons/ri';

function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    number: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const data = userDoc.data();

        setUserData({
          username: data.username || '',
          email: data.email || user.email || '',
          number: data.number || '',
          newPassword: '',
          confirmPassword: ''
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        showNotification('Error loading profile data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (userData.newPassword && userData.newPassword !== userData.confirmPassword) {
      showNotification('New passwords do not match', 'error');
      return false;
    }
    if (userData.newPassword && userData.newPassword.length < 6) {
      showNotification('Password must be at least 6 characters', 'error');
      return false;
    }
    return true;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSaving(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');

      // Reauthenticate user if changing sensitive information
      if (userData.newPassword || userData.email !== user.email) {
        if (!currentPassword) {
          showNotification('Current password required for sensitive changes', 'error');
          setSaving(false);
          return;
        }

        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
      }

      // Update profile in Firebase Auth
      await updateProfile(user, {
        displayName: userData.username
      });

      // Update email if changed
      if (userData.email !== user.email) {
        await updateEmail(user, userData.email);
      }

      // Update password if provided
      if (userData.newPassword) {
        await updatePassword(user, userData.newPassword);
      }

      // Update Firestore document
      await updateDoc(doc(db, 'users', user.uid), {
        username: userData.username,
        email: userData.email,
        number: userData.number
      });

      showNotification('Profile updated successfully');
      setEditMode(false);
      setCurrentPassword('');
      setUserData(prev => ({
        ...prev,
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      console.error('Error updating profile:', error);
      showNotification(
        error.code === 'auth/wrong-password'
          ? 'Current password is incorrect'
          : 'Error updating profile',
        'error'
      );
    } finally {
      setSaving(false);
    }
  };

  const SettingsSection = ({ title, icon: Icon, children }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-teal-50 rounded-lg">
            <Icon className="text-2xl text-teal-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
              <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
            </div>

            <button
              onClick={() => setEditMode(!editMode)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                ${editMode
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800'}
              `}
            >
              {editMode ? (
                <>
                  <RiCloseCircleLine className="text-xl" />
                  <span>Cancel Editing</span>
                </>
              ) : (
                <>
                  <RiEditLine className="text-xl" />
                  <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>

          {notification && (
            <div 
              className={`mb-6 p-4 rounded-lg ${
                notification.type === 'error' 
                  ? 'bg-red-50 border border-red-100 text-red-600' 
                  : 'bg-green-50 border border-green-100 text-green-600'
              }`}
              role="alert"
            >
              <p className="flex items-center">
                <RiInformationLine className="mr-2" />
                {notification.message}
              </p>
            </div>
          )}

          <div className="space-y-6">
            {/* Profile Information */}
            <SettingsSection title="Profile Information" icon={RiUser3Line}>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="number"
                      value={userData.number}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </form>
            </SettingsSection>

            {/* Security Settings */}
            <SettingsSection title="Security Settings" icon={RiShieldUserLine}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {editMode && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password to save changes"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          value={userData.newPassword}
                          onChange={handleChange}
                          placeholder="Enter new password"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={userData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm new password"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </SettingsSection>

            {editMode && (
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 transition-colors disabled:opacity-70"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <RiSaveLine className="text-xl" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;