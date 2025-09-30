import React, { useState, useEffect } from 'react';
import { Search, Bell, Plus, Calendar, Clock, LogOut, User } from 'lucide-react';
import './Header.css';

const Header = ({ user, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format date and time
  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date) => {
    const options = { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    };
    return date.toLocaleTimeString('en-US', options);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="search-container">
          <Search className="search-icon" />
          <input 
            type="text" 
            placeholder="Search here..." 
            className="search-input"
          />
        </div>
      </div>

      <div className="header-right">
        <button className="btn btn-primary add-patient-btn">
          <Plus className="btn-icon" />
          Add patient
        </button>

        <div className="notification-container">
          <Bell className="notification-icon" />
          <span className="notification-badge">3</span>
        </div>

        <div className="date-time-container">
          <div className="date-section">
            <Calendar className="date-icon" />
            <span className="date-text">{formatDate(currentDateTime)}</span>
          </div>
          <div className="time-section">
            <Clock className="time-icon" />
            <span className="time-text">{formatTime(currentDateTime)}</span>
          </div>
        </div>

        <div className="user-profile" onClick={toggleUserMenu}>
          <img 
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face" 
            alt="User Avatar" 
            className="user-avatar"
          />
          <div className="user-info">
            <span className="user-name">{user?.name || 'User'}</span>
            <span className="user-role">{user?.role || 'Patient'}</span>
          </div>
          
          {showUserMenu && (
            <div className="user-menu">
              <div className="user-menu-item">
                <User className="menu-icon" />
                <span>Profile</span>
              </div>
              <div className="user-menu-item" onClick={handleLogout}>
                <LogOut className="menu-icon" />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;