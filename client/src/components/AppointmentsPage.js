import React, { useState } from 'react';
import { Calendar, Clock, Search, Phone, Mail, User, Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import './AppointmentsPage.css';

const AppointmentsPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState('day');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  // Modal states
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  // Sample appointments data
  const [appointments, setAppointments] = useState([
    {
      id: '00863',
      doctorName: 'Floyd Miles',
      visitType: 'New symptom visit',
      dateTime: '2021-05-26 7:1:00 pm',
      status: 'Not Confirmed',
      statusType: 'not-confirmed'
    },
    {
      id: '00845',
      doctorName: 'Devon Lane',
      visitType: 'Follow up visit',
      dateTime: '2021-05-17 10:45 am',
      status: 'Not Confirmed',
      statusType: 'not-confirmed'
    },
    {
      id: '00842',
      doctorName: 'Marvin McKinney',
      visitType: 'Follow up visit',
      dateTime: '2021-05-10 09:00 am',
      status: 'Request Cancellation',
      statusType: 'request-cancellation'
    },
    {
      id: '00774',
      doctorName: 'Guy Hawkins',
      visitType: 'New symptom visit',
      dateTime: '2021-05-05 05:00 pm',
      status: 'Confirmed on 2021-05-05',
      statusType: 'confirmed'
    },
    {
      id: '00865',
      doctorName: 'Cameron Williamson',
      visitType: 'Chronic care visit',
      dateTime: '2021-04-28 11:10 am',
      status: 'Confirmed on 2021-04-27',
      statusType: 'confirmed'
    },
    {
      id: '00834',
      doctorName: 'Albert Flores',
      visitType: 'New symptom visit',
      dateTime: '2021-04-22 14:20 pm',
      status: 'Confirmed on 2021-04-21',
      statusType: 'confirmed'
    },
    {
      id: '00843',
      doctorName: 'Jerome Bell',
      visitType: 'Follow up visit',
      dateTime: '2021-04-17 06:20 am',
      status: 'Confirmed on 2021-04-17',
      statusType: 'confirmed'
    },
    {
      id: '00845',
      doctorName: 'Dianne Russell',
      visitType: 'New symptom visit',
      dateTime: '2021-04-15 11:40 am',
      status: 'Confirmed on 2021-04-15',
      statusType: 'confirmed'
    },
    {
      id: '00856',
      doctorName: 'Ronald Richards',
      visitType: 'Follow up visit',
      dateTime: '2021-04-11 11:15 am',
      status: 'Request Cancellation',
      statusType: 'request-cancellation'
    },
    {
      id: '00143',
      doctorName: 'Darlene Robertson',
      visitType: 'New symptom visit',
      dateTime: '2021-04-10 09:20 am',
      status: 'Confirmed on 2021-04-10',
      statusType: 'confirmed'
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

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    // Could open a view modal or navigate to appointment details
    alert(`Viewing appointment ${appointment.id} for ${appointment.doctorName}`);
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

  // Checkbox functionality
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedAppointments([]);
      setSelectAll(false);
    } else {
      setSelectedAppointments(filteredAppointments.map(apt => apt.id));
      setSelectAll(true);
    }
  };

  const handleSelectAppointment = (appointmentId) => {
    setSelectedAppointments(prev => {
      const newSelected = prev.includes(appointmentId)
        ? prev.filter(id => id !== appointmentId)
        : [...prev, appointmentId];
      
      // Update selectAll state based on selection
      setSelectAll(newSelected.length === filteredAppointments.length);
      return newSelected;
    });
  };

  const handleBulkAction = (action) => {
    if (selectedAppointments.length === 0) {
      alert('Please select appointments first');
      return;
    }

    switch (action) {
      case 'confirm':
        setAppointments(prev => prev.map(apt => 
          selectedAppointments.includes(apt.id) 
            ? { ...apt, status: 'Confirmed', statusType: 'confirmed' } 
            : apt
        ));
        break;
      case 'cancel':
        setAppointments(prev => prev.map(apt => 
          selectedAppointments.includes(apt.id) 
            ? { ...apt, status: 'Cancelled', statusType: 'cancelled' } 
            : apt
        ));
        break;
      case 'delete':
        setAppointments(prev => prev.filter(apt => !selectedAppointments.includes(apt.id)));
        break;
      default:
        break;
    }
    
    // Clear selections after action
    setSelectedAppointments([]);
    setSelectAll(false);
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
    appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.visitType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.id.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="appointments-table-container">
          <div className="table-header">
            <div className="table-controls">
              <div className="show-entries">
                <span>Show:</span>
                <select className="entries-select">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>
              <div className="table-actions">
                <button className="refresh-btn">
                  <Calendar size={16} />
                  Refresh data
                </button>
                <button className="filter-btn">Show Filters</button>
                <button className="download-btn">Download PDF</button>
                {selectedAppointments.length > 0 && (
                  <div className="bulk-actions">
                    <button 
                      className="bulk-btn confirm-bulk"
                      onClick={() => handleBulkAction('confirm')}
                    >
                      <CheckCircle size={16} />
                      Confirm Selected ({selectedAppointments.length})
                    </button>
                    <button 
                      className="bulk-btn cancel-bulk"
                      onClick={() => handleBulkAction('cancel')}
                    >
                      <XCircle size={16} />
                      Cancel Selected
                    </button>
                    <button 
                      className="bulk-btn delete-bulk"
                      onClick={() => handleBulkAction('delete')}
                    >
                      <Trash2 size={16} />
                      Delete Selected
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="appointments-table">
            <table>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="select-all-checkbox"
                    />
                  </th>
                  <th>ID#</th>
                  <th>Doctor's Name</th>
                  <th>Visit type</th>
                  <th>Date/Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedAppointments.includes(appointment.id)}
                        onChange={() => handleSelectAppointment(appointment.id)}
                        className="appointment-checkbox"
                      />
                    </td>
                    <td className="appointment-id">{appointment.id}</td>
                    <td className="doctor-name">{appointment.doctorName}</td>
                    <td className="visit-type">{appointment.visitType}</td>
                    <td className="date-time">{appointment.dateTime}</td>
                    <td className="status">
                      <span className={`status-badge ${appointment.statusType}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="actions">
                      <div className="action-buttons">
                        <button 
                          className="action-btn view-btn"
                          onClick={() => handleViewAppointment(appointment)}
                          title="View"
                        >
                          <User size={16} />
                        </button>
                        <button 
                          className="action-btn edit-btn"
                          onClick={() => handleEditAppointment(appointment)}
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="action-btn cancel-btn"
                          onClick={() => handleCancelAppointment(appointment.id)}
                          title="Cancel"
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                  <label>Doctor Name</label>
                  <input type="text" defaultValue={selectedAppointment.doctorName} />
                </div>
                <div className="form-group">
                  <label>Date/Time</label>
                  <input type="text" defaultValue={selectedAppointment.dateTime} />
                </div>
                <div className="form-group">
                  <label>Visit Type</label>
                  <select defaultValue={selectedAppointment.visitType}>
                    <option>New symptom visit</option>
                    <option>Follow up visit</option>
                    <option>Chronic care visit</option>
                    <option>General Checkup</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select defaultValue={selectedAppointment.statusType}>
                    <option value="confirmed">Confirmed</option>
                    <option value="not-confirmed">Not Confirmed</option>
                    <option value="request-cancellation">Request Cancellation</option>
                  </select>
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