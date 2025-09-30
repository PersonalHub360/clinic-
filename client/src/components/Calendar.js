import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, Stethoscope } from 'lucide-react';
import './Calendar.css';

const Calendar = ({ appointments }) => {
  const [currentDate] = useState(new Date(2023, 8, 4)); // September 4, 2023
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const today = currentDate.getDate();

  return (
    <div className="calendar card">
      <div className="card-header">
        <h3 className="card-title">Today 4th Sep 2023</h3>
        <button className="btn btn-primary calendar-add-btn">
          <Plus className="btn-icon" />
        </button>
      </div>
      
      <div className="calendar-content">
        <div className="calendar-header">
          <button className="calendar-nav-btn">
            <ChevronLeft className="nav-icon" />
          </button>
          <span className="calendar-month">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button className="calendar-nav-btn">
            <ChevronRight className="nav-icon" />
          </button>
        </div>
        
        <div className="calendar-grid">
          <div className="calendar-days-header">
            {daysOfWeek.map((day) => (
              <div key={day} className="calendar-day-header">
                {day}
              </div>
            ))}
          </div>
          
          <div className="calendar-days">
            {days.map((day, index) => (
              <div
                key={index}
                className={`calendar-day ${day === today ? 'today' : ''} ${day === 5 ? 'selected' : ''}`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
        
        <div className="appointments-section">
          <h4 className="appointments-title">Appointments</h4>
          <div className="appointments-list">
            {appointments && appointments.length > 0 ? (
              appointments.map((appointment) => (
                <div key={appointment.id} className="appointment-item">
                  <div className={`appointment-icon ${appointment.type}`}>
                    {appointment.type === 'meeting' ? (
                      <Clock className="appointment-icon-svg" />
                    ) : (
                      <Stethoscope className="appointment-icon-svg" />
                    )}
                  </div>
                  <div className="appointment-content">
                    <div className="appointment-title">{appointment.title}</div>
                    <div className="appointment-time">{appointment.time}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-appointments">
                <p>No appointments today</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;