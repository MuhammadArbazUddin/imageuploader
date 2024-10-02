import React, { useState, useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebasecongig';
import { onAuthStateChanged, signOut, updatePassword } from 'firebase/auth';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);
        setUser(currentUser);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleLogout = async () => {
    await signOut(auth);
    console.log('User logged out');
    navigate('/');
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      await updatePassword(user, newPassword);
      alert('Password updated successfully');
      setShowPasswordForm(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Error updating password:', err);
      alert('Error updating password');
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const togglePasswordForm = (e) => {
    e.stopPropagation(); // Prevent the dropdown from closing
    setShowPasswordForm(!showPasswordForm);
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation(); // Prevent closing when clicking inside the dropdown
  };

  return (
    <div className="header">
      <div className="buttons">
        {!isLoggedIn ? (
          <>
            <div className="login-btn" onClick={handleLoginClick}>Login</div>
            <div className="signup-btn" onClick={handleSignupClick}>Signup</div>
          </>
        ) : (
          <>
            <div className="logout-btn" onClick={handleLogout}>Logout</div>
            <div className="profile" onClick={toggleDropdown}>
              <span>{user?.displayName}</span>
              {showDropdown && (
                <div className="dropdown-menu" onClick={handleDropdownClick}>
                  <div className="dropdown-item">Username: {user?.displayName}</div>
                  <div className="dropdown-item">Email: {user?.email}</div>
                  <div className="dropdown-item" onClick={togglePasswordForm}>Change Password</div>
                  {showPasswordForm && (
                    <form onSubmit={handleChangePassword} className="password-form">
                      <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button type="submit">Update Password</button>
                    </form>
                  )}
                </div>
              )}
            </div>
            {/* Logout button added here */}
            
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
