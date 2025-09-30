import React, { useState } from 'react';
import { Calendar, Clock, Search, Phone, Mail, User, Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import './AppointmentsPage.css';

const AppointmentsPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState('day');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  // Sample appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      time: '09:00',
      duration: '30 min',
      patient: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        phone: '+1 (555) 123-4567',
        email: 'sarah.j@email.com'
      },
      type: 'General Checkup',
      status: 'confirmed',
      notes: 'Regular health checkup and blood pressure monitoring'
    },
    {
      id: 2,
      time: '10:30',
      duration: '45 min',
      patient: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        phone: '+1 (555) 987-6543',
        email: 'michael.chen@email.com'
      },
      type: 'Dental Cleaning',
      status: 'pending',
      notes: 'Routine dental cleaning and examination'
    },
    {
      id: 3,
      time: '14:00',
      duration: '60 min',
      patient: {
        name: 'Emily Davis',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        phone: '+1 (555) 456-7890',
        email: 'emily.davis@email.com'
      },
      type: 'Consultation',
      status: 'confirmed',
      notes: 'Follow-up consultation for treatment plan'
    },
    {
      id: 4,
      time: '15:30',
      duration: '30 min',
      patient: {
        name: 'Robert Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        phone: '+1 (555) 321-0987',
        email: 'robert.w@email.com'
      },
      type: 'Physical Therapy',
      status: 'cancelled',
      notes: 'Cancelled due to patient illness'
    }
  ]);

  // Appointment management functions
  const handleNewAppointment = () => {
    setShowNewAppointmentModal(true);
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowEditModal(true);
  };

  const handleConfirmAppointment = (appointmentId) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, status: 'confirmed' } : apt
    ));
  };

  const handleCancelAppointment = (appointmentId) => {
    setConfirmAction(() => () => {
      setAppointments(prev => prev.map(apt => 
        apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
      ));
      setShowConfirmDialog(false);
    });
    setShowConfirmDialog(true);
  };

  const handleCalendarDayClick = (day) => {
    const dateString = day.toISOString().split('T')[0];
    setSelectedDate(dateString);
  };

  const handleAddPatient = () => {
    alert('Add Patient functionality - would open patient registration form');
  };

  const handleViewCalendar = () => {
    alert('View Calendar functionality - would open full calendar view');
  };

  const closeModals = () => {
    setShowNewAppointmentModal(false);
    setShowEditModal(false);
    setSelectedAppointment(null);
    setShowConfirmDialog(false);
    setConfirmAction(null);
  };

  const stats = [
    { label: 'Today\'s Appointments', value: '12', color: '#10b981' },
    { label: 'Confirmed', value: '8', color: '#3b82f6' },
    { label: 'Pending', value: '3', color: '#f59e0b' },
    { label: 'Cancelled', value: '1', color: '#ef4444' }
  ];

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const calendarDays = generateCalendarDays();
  const today = new Date();

  return (
    <div className="appointments-page">
      <div className="appointments-header">
        <div className="header-left">
          <h1>Appointments</h1>
          <p className="page-subtitle">Manage and schedule patient appointments</p>
        </div>
      </div>

      <div className="appointments-stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-value" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="appointments-controls">
        <div className="date-selector">
          <Calendar className="calendar-icon" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-input"
          />
        </div>

        <div className="view-modes">
          {['day', 'week', 'month'].map((mode) => (
            <button
              key={mode}
              className={`view-btn ${viewMode === mode ? 'active' : ''}`}
              onClick={() => setViewMode(mode)}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>

        <div className="search-filter">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      <div className="appointments-content">
        <div className="appointments-list">
          <h3 className="list-title">Today's Schedule</h3>
          <div className="appointments-timeline">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className={`appointment-card ${appointment.status}`}>
                <div className="appointment-time">
                  <Clock size={16} />
                  <span>{appointment.time}</span>
                  <span className="duration">{appointment.duration}</span>
                </div>
                
                <div className="appointment-content">
                  <div className="appointment-header">
                    <div className="patient-info">
                      <img
                        src={appointment.patient.avatar}
                        alt={appointment.patient.name}
                        className="patient-avatar"
                      />
                      <div>
                        <h4 className="patient-name">{appointment.patient.name}</h4>
                        <p className="appointment-type">{appointment.type}</p>
                      </div>
                    </div>
                    <span className={`status-badge ${appointment.status}`}>
                      {appointment.status}
                    </span>
                  </div>

                  <div className="appointment-details">
                    <div className="contact-info">
                      <Phone size={14} />
                      <span>{appointment.patient.phone}</span>
                    </div>
                    <div className="contact-info">
                      <Mail size={14} />
                      <span>{appointment.patient.email}</span>
                    </div>
                    {appointment.notes && (
                      <p className="appointment-notes">{appointment.notes}</p>
                    )}
                  </div>

                  <div className="appointment-actions">
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEditAppointment(appointment)}
                    >
                      <Edit className="btn-icon" />
                      Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-outline"
                      onClick={() => handleConfirmAppointment(appointment.id)}
                      disabled={appointment.status === 'confirmed'}
                    >
                      <CheckCircle className="btn-icon" />
                      Confirm
                    </button>
                    <button 
                      className="btn btn-sm btn-outline"
                      onClick={() => handleCancelAppointment(appointment.id)}
                      disabled={appointment.status === 'cancelled'}
                    >
                      <XCircle className="btn-icon" />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="calendar-widget">
          <div className="mini-calendar">
            <div className="widget-header">
              <h3>Calendar</h3>
            </div>
            <div className="calendar-grid">
              <div className="calendar-header">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>
              <div className="calendar-body">
                {calendarDays.map((day, index) => {
                  const isToday = day.toDateString() === today.toDateString();
                  const hasAppointments = Math.random() > 0.7; // Random for demo
                  return (
                    <div
                      key={index}
                      className={`calendar-day ${isToday ? 'today' : ''} ${hasAppointments ? 'has-appointments' : ''}`}
                      onClick={() => handleCalendarDayClick(day)}
                    >
                      {day.getDate()}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="quick-actions">
            <h4>Quick Actions</h4>
            <button className="quick-btn" onClick={handleNewAppointment}>
              <Plus size={16} />
              New Appointment
            </button>
            <button className="quick-btn" onClick={handleAddPatient}>
              <User size={16} />
              Add Patient
            </button>
            <button className="quick-btn" onClick={handleViewCalendar}>
              <Calendar size={16} />
              View Calendar
            </button>
          </div>
        </div>
      </div>

      {/* New Appointment Modal */}
      {showNewAppointmentModal && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>New Appointment</h2>
              <button className="close-btn" onClick={closeModals}>
                <XCircle size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="appointment-form">
                <div className="form-group">
                  <label>Patient Name</label>
                  <input type="text" placeholder="Enter patient name" />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" defaultValue={selectedDate} />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input type="time" />
                </div>
                <div className="form-group">
                  <label>Appointment Type</label>
                  <select>
                    <option>General Checkup</option>
                    <option>Consultation</option>
                    <option>Dental Cleaning</option>
                    <option>Physical Therapy</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea placeholder="Additional notes..."></textarea>
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn btn-outline" onClick={closeModals}>Cancel</button>
                <button className="btn btn-primary">Schedule Appointment</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Appointment Modal */}
      {showEditModal && selectedAppointment && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Appointment</h2>
              <button className="close-btn" onClick={closeModals}>
                <XCircle size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="appointment-form">
                <div className="form-group">
                  <label>Patient Name</label>
                  <input type="text" defaultValue={selectedAppointment.patient.name} />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" defaultValue={selectedDate} />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input type="time" defaultValue={selectedAppointment.time} />
                </div>
                <div className="form-group">
                  <label>Appointment Type</label>
                  <select defaultValue={selectedAppointment.type}>
                    <option>General Checkup</option>
                    <option>Consultation</option>
                    <option>Dental Cleaning</option>
                    <option>Physical Therapy</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea defaultValue={selectedAppointment.notes}></textarea>
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn btn-outline" onClick={closeModals}>Cancel</button>
                <button className="btn btn-primary">Update Appointment</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      {showConfirmDialog && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Action</h2>
              <button className="close-btn" onClick={closeModals}>
                <XCircle size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to cancel this appointment?</p>
              <div className="modal-actions">
                <button className="btn btn-outline" onClick={closeModals}>No, Keep It</button>
                <button className="btn btn-danger" onClick={confirmAction}>Yes, Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;