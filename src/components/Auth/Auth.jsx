import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebasecongig';  // Import auth from your Firebase config
import { useNavigate } from 'react-router-dom';  // Use this for redirection
import './Auth.css';

function Auth({ type }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Reset error

    try {
      if (type === 'signup') {
        // Create a new user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Update the user profile with the entered username
        await updateProfile(user, {
          displayName: username,
        });

        console.log('User signed up successfully with username:', username);
      } else {
        // Sign in the user
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in successfully');
      }
      
      // Redirect to another page (e.g., dashboard) on success
      navigate('/');  // Adjust this to your desired route
    } catch (err) {
      setError(err.message);  // Handle and display errors
    }
  };

  // Redirect user to the other form (login or signup) when decision link is clicked
  const handleDecisionClick = (e) => {
    e.preventDefault();
    if (type === 'login') {
      navigate('/signup');  // Redirect to signup if on login page
    } else {
      navigate('/login');  // Redirect to login if on signup page
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <h2 className="auth-title">{type === 'login' ? 'Login' : 'Signup'}</h2>
        {error && <p className="auth-error">{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          {type === 'signup' && (
            <input
              type="text"
              placeholder="Username"
              className="auth-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a className="decision" href="" onClick={handleDecisionClick}>
            {type === 'login' ? 'Create a new Account' : 'Already have an Account'}
          </a>
          <button type="submit" className="auth-btn">
            {type === 'login' ? 'Login' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
