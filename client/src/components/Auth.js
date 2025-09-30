import React from 'react';
import Login from './Login';

const Auth = ({ onAuthSuccess }) => {
  const handleLogin = (credentials) => {
    // Simulate successful login
    console.log('Login attempt:', credentials);
    
    // In a real app, you would validate credentials with your backend
    // For demo purposes, we'll accept any valid email/password
    if (credentials.email && credentials.password) {
      const userData = {
        id: 1,
        name: credentials.email.split('@')[0],
        email: credentials.email,
        role: 'patient',
        isAuthenticated: true
      };
      
      // Store user data in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(userData));
      
      if (onAuthSuccess) {
        onAuthSuccess(userData);
      }
    }
  };

  return (
    <div>
      <Login 
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Auth;