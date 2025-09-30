import React from 'react';
import './WelcomeMessage.css';

const WelcomeMessage = () => {
  return (
    <div className="welcome-message">
      <h1 className="welcome-title">
        Hello, Sourav 👋
      </h1>
      <p className="welcome-subtitle">
        There is the latest update for the last 7 days, check now
      </p>
    </div>
  );
};

export default WelcomeMessage;