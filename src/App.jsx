// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Screen from './components/Screen/Screen';
import SignupPage from './components/SignupPage/SignupPage';
import LoginPage from './components/LoginPage/LoginPage';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Screen />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/profile" element={<Profile />} />   */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
