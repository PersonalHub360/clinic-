import React from 'react';
import { MoreHorizontal, Bed, Home } from 'lucide-react';
import './RoomOccupancy.css';

const RoomOccupancy = ({ occupancy }) => {
  return (
    <div className="room-occupancy card">
      <div className="card-header">
        <h3 className="card-title">Room occupancy</h3>
        <button className="more-btn">
          <MoreHorizontal className="more-icon" />
        </button>
      </div>
      
      <div className="occupancy-content">
        <div className="occupancy-main">
          <div className="occupancy-number">{occupancy?.overall || 0}</div>
          <div className="occupancy-change">+124</div>
        </div>
        
        <div className="room-types">
          <div className="room-type">
            <div className="room-icon-container general">
              <Bed className="room-icon" />
            </div>
            <div className="room-info">
              <span className="room-label">General room</span>
              <span className="room-count">{occupancy?.generalRoom || 0}</span>
            </div>
          </div>
          
          <div className="room-type">
            <div className="room-icon-container private">
              <Home className="room-icon" />
            </div>
            <div className="room-info">
              <span className="room-label">Private room</span>
              <span className="room-count">{occupancy?.privateRoom || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomOccupancy;