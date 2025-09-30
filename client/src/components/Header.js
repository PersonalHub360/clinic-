import React from 'react';
import { Search, Bell, Plus, Calendar } from 'lucide-react';
import './Header.css';

const Header = () => {
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

        <div className="date-container">
          <Calendar className="date-icon" />
          <span className="date-text">Monday, 4th September</span>
        </div>

        <div className="user-profile">
          <img 
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face" 
            alt="User Avatar" 
            className="user-avatar"
          />
          <div className="user-info">
            <span className="user-name">Sourav</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;