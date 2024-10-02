// src/components/Profile/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword, signOut, onAuthStateChanged, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';  // Import necessary Firebase functions
import { auth } from '../../components/firebasecongig';  // Import Firebase auth configuration
import './profile.css';

function Profile() {
  const [user, setUser] = useState(null);  // State for the authenticated user
  const [currentPassword, setCurrentPassword] = useState('');  // State for the current password
  const [newPassword, setNewPassword] = useState('');  // State for the new password
  const [passwordChangeMessage, setPasswordChangeMessage] = useState('');  // Message after password update
  const [reauthenticateError, setReauthenticateError] = useState('');  // Error message for reauthentication
  const navigate = useNavigate();  // Use navigate for redirection

  // Fetch the authenticated user on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);  // Set the authenticated user
      } else {
        navigate('/login');  // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Function to reauthenticate the user with their current password
  const handleReauthenticate = async () => {
    const credential = EmailAuthProvider.credential(user.email, currentPassword);  // Create a credential object
    try {
      await reauthenticateWithCredential(user, credential);  // Reauthenticate the user
      setReauthenticateError('');  // Clear any previous reauthentication errors
      handleChangePassword();  // Call change password function after reauthentication
    } catch (error) {
      console.error('Error reauthenticating:', error);
      setReauthenticateError(`Reauthentication failed: ${error.message}`);  // Set error message
    }
  };

  // Function to handle password change
  const handleChangePassword = async () => {
    if (newPassword) {
      try {
        await updatePassword(user, newPassword);  // Update the password for the authenticated user
        setPasswordChangeMessage('Password updated successfully');  // Set success message
        setNewPassword('');  // Clear the new password field
      } catch (error) {
        console.error('Error updating password:', error);
        setPasswordChangeMessage(`Error: ${error.message}`);  // Set error message
      }
    } else {
      setPasswordChangeMessage('Please enter a new password');
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);  // Sign out the authenticated user
      navigate('/');  // Redirect to the home page after logout
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Function to navigate back to the home page
  const handleBackToHome = () => {
    navigate('/');  // Navigate to the home page
  };

  return (
    <div className="profile-page">
      <h2>Profile Information</h2>
      <div className="profile-details">
        <div className="profile-item">Username: {user?.displayName || 'N/A'}</div>
        <div className="profile-item">Email: {user?.email}</div>
      </div>

      {/* Password Change Section */}
      <div className="password-change-section">
        <h3>Change Password</h3>
        <div className="password-change-form">
          {/* Input field for current password */}
          <input
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="password-input"
          />
          {/* Input field for new password */}
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}  // Set new password on change
            className="password-input"
          />
          <button onClick={handleReauthenticate} className="change-password-btn">
            Change Password
          </button>
        </div>
        {/* Display message for password change status */}
        {passwordChangeMessage && <div className="password-change-message">{passwordChangeMessage}</div>}
        {/* Display message for reauthentication errors */}
        {reauthenticateError && <div className="reauthenticate-error">{reauthenticateError}</div>}
      </div>

      {/* Logout Section */}
      <div className="logout-section">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {/* Back to Home Button */}
      <div className="back-to-home-section">
        <button onClick={handleBackToHome} className="back-to-home-btn">
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Profile;
