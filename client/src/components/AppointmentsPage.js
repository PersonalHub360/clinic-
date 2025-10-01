import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Search, 
  Phone, 
  Mail, 
  User, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Filter,
  Download,
  Printer,
  RefreshCw,
  Eye,
  Users,
  CalendarDays,
  MapPin,
  Stethoscope,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  SortAsc,
  SortDesc,
  Bell,
  Settings,
  FileText,
  Activity
} from 'lucide-react';
import './AppointmentsPage.css';

const AppointmentsPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dateTime');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  
  // Modal states
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);

  // Enhanced appointments data with more comprehensive information
  const [appointments, setAppointments] = useState([
    {
      id: '00863',
      patientName: 'Sarah Johnson',
      patientId: 'PAT-001',
      doctorName: 'Dr. Floyd Miles',
      doctorId: 'DOC-001',
      department: 'Cardiology',
      visitType: 'New symptom visit',
      dateTime: '2024-01-26T19:01:00',
      duration: 30,
      status: 'Not Confirmed',
      statusType: 'not-confirmed',
      priority: 'high',
      symptoms: 'Chest pain, shortness of breath',
      notes: 'Patient reports chest discomfort for 3 days',
      contactNumber: '+1 (555) 123-4567',
      email: 'sarah.johnson@email.com',
      insurance: 'Blue Cross Blue Shield',
      roomNumber: 'Room 201',
      appointmentType: 'In-person'
    },
    {
      id: '00845',
      patientName: 'Michael Chen',
      patientId: 'PAT-002',
      doctorName: 'Dr. Devon Lane',
      doctorId: 'DOC-002',
      department: 'General Medicine',
      visitType: 'Follow up visit',
      dateTime: '2024-01-17T10:45:00',
      duration: 20,
      status: 'Confirmed',
      statusType: 'confirmed',
      priority: 'medium',
      symptoms: 'Follow-up for hypertension',
      notes: 'Blood pressure monitoring',
      contactNumber: '+1 (555) 234-5678',
      email: 'michael.chen@email.com',
      insurance: 'Aetna',
      roomNumber: 'Room 105',
      appointmentType: 'In-person'
    },
    {
      id: '00842',
      patientName: 'Emily Davis',
      patientId: 'PAT-003',
      doctorName: 'Dr. Marvin McKinney',
      doctorId: 'DOC-003',
      department: 'Pediatrics',
      visitType: 'Routine checkup',
      dateTime: '2024-01-10T09:00:00',
      duration: 25,
      status: 'Request Cancellation',
      statusType: 'request-cancellation',
      priority: 'low',
      symptoms: 'Annual physical exam',
      notes: 'Routine pediatric examination',
      contactNumber: '+1 (555) 345-6789',
      email: 'emily.davis@email.com',
      insurance: 'United Healthcare',
      roomNumber: 'Room 302',
      appointmentType: 'In-person'
    },
    {
      id: '00774',
      patientName: 'Robert Wilson',
      patientId: 'PAT-004',
      doctorName: 'Dr. Guy Hawkins',
      doctorId: 'DOC-004',
      department: 'Orthopedics',
      visitType: 'New symptom visit',
      dateTime: '2024-01-05T17:00:00',
      duration: 45,
      status: 'Confirmed',
      statusType: 'confirmed',
      priority: 'high',
      symptoms: 'Knee pain and swelling',
      notes: 'Sports injury evaluation',
      contactNumber: '+1 (555) 456-7890',
      email: 'robert.wilson@email.com',
      insurance: 'Cigna',
      roomNumber: 'Room 150',
      appointmentType: 'In-person'
    },
    {
      id: '00865',
      patientName: 'Lisa Anderson',
      patientId: 'PAT-005',
      doctorName: 'Dr. Cameron Williamson',
      doctorId: 'DOC-005',
      department: 'Dermatology',
      visitType: 'Chronic care visit',
      dateTime: '2024-01-28T11:10:00',
      duration: 30,
      status: 'Confirmed',
      statusType: 'confirmed',
      priority: 'medium',
      symptoms: 'Skin condition monitoring',
      notes: 'Regular dermatology follow-up',
      contactNumber: '+1 (555) 567-8901',
      email: 'lisa.anderson@email.com',
      insurance: 'Kaiser Permanente',
      roomNumber: 'Room 220',
      appointmentType: 'Telemedicine'
    }
  ]);

  // Statistics calculation
  const appointmentStats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(apt => 
      apt.dateTime.split('T')[0] === today
    );
    
    return {
      total: appointments.length,
      today: todayAppointments.length,
      confirmed: appointments.filter(apt => apt.statusType === 'confirmed').length,
      pending: appointments.filter(apt => apt.statusType === 'not-confirmed').length,
      cancelled: appointments.filter(apt => apt.statusType === 'request-cancellation').length,
      completed: appointments.filter(apt => apt.statusType === 'completed').length
    };
  }, [appointments]);

  // Enhanced filtering and sorting
  const filteredAndSortedAppointments = useMemo(() => {
    let filtered = appointments.filter(appointment => {
      const matchesSearch = 
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.visitType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || appointment.statusType === statusFilter;
      const matchesDoctor = doctorFilter === 'all' || appointment.doctorId === doctorFilter;
      
      return matchesSearch && matchesStatus && matchesDoctor;
    });

    // Sort appointments
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'dateTime':
          aValue = new Date(a.dateTime);
          bValue = new Date(b.dateTime);
          break;
        case 'patientName':
          aValue = a.patientName.toLowerCase();
          bValue = b.patientName.toLowerCase();
          break;
        case 'doctorName':
          aValue = a.doctorName.toLowerCase();
          bValue = b.doctorName.toLowerCase();
          break;
        case 'status':
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
          break;
        default:
          return 0;
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [appointments, searchTerm, statusFilter, doctorFilter, sortBy, sortOrder]);

  // Get unique doctors for filter
  const doctors = useMemo(() => {
    const uniqueDoctors = [...new Set(appointments.map(apt => apt.doctorName))];
    return uniqueDoctors.map((name, index) => ({
      id: `DOC-${index + 1}`,
      name
    }));
  }, [appointments]);

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
    setShowAppointmentDetails(true);
  };

  const handleConfirmAppointment = (appointmentId) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { 
        ...apt, 
        status: 'Confirmed', 
        statusType: 'confirmed' 
      } : apt
    ));
  };

  const handleCancelAppointment = (appointmentId) => {
    setConfirmAction(() => () => {
      setAppointments(prev => prev.map(apt => 
        apt.id === appointmentId ? { 
          ...apt, 
          status: 'Cancelled', 
          statusType: 'cancelled' 
        } : apt
      ));
      setShowConfirmDialog(false);
    });
    setShowConfirmDialog(true);
  };

  const handleDeleteAppointment = (appointmentId) => {
    setConfirmAction(() => () => {
      setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
      setShowConfirmDialog(false);
    });
    setShowConfirmDialog(true);
  };

  // Sorting functions
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? <SortAsc className="sort-icon" /> : <SortDesc className="sort-icon" />;
  };

  // Status styling functions
  const getStatusClass = (statusType) => {
    switch (statusType) {
      case 'confirmed': return 'status-confirmed';
      case 'not-confirmed': return 'status-pending';
      case 'request-cancellation': return 'status-cancelled';
      case 'completed': return 'status-completed';
      default: return 'status-default';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-default';
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  // Checkbox functionality
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedAppointments([]);
      setSelectAll(false);
    } else {
      setSelectedAppointments(filteredAndSortedAppointments.map(apt => apt.id));
      setSelectAll(true);
    }
  };

  const handleSelectAppointment = (appointmentId) => {
    setSelectedAppointments(prev => {
      const newSelected = prev.includes(appointmentId)
        ? prev.filter(id => id !== appointmentId)
        : [...prev, appointmentId];
      
      setSelectAll(newSelected.length === filteredAndSortedAppointments.length);
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
    
    setSelectedAppointments([]);
    setSelectAll(false);
  };

  return (
    <div className="appointments-page">
      {/* Enhanced Header */}
      <div className="appointments-header">
        <div className="header-left">
          <h1>Appointments Management</h1>
          <p>Manage and schedule patient appointments</p>
        </div>
        
        <div className="header-actions">
          <button className="action-btn secondary">
            <RefreshCw className="icon" />
            Refresh
          </button>
          <button className="action-btn secondary">
            <Download className="icon" />
            Export
          </button>
          <button className="action-btn secondary">
            <Printer className="icon" />
            Print
          </button>
          <button className="action-btn primary" onClick={handleNewAppointment}>
            <Plus className="icon" />
            New Appointment
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="appointments-stats">
        <div className="stat-card total">
          <div className="stat-icon">
            <Calendar />
          </div>
          <div className="stat-content">
            <h3>{appointmentStats.total}</h3>
            <p>Total Appointments</p>
          </div>
        </div>

        <div className="stat-card today">
          <div className="stat-icon">
            <Clock />
          </div>
          <div className="stat-content">
            <h3>{appointmentStats.today}</h3>
            <p>Today's Appointments</p>
          </div>
        </div>

        <div className="stat-card confirmed">
          <div className="stat-icon">
            <CheckCircle />
          </div>
          <div className="stat-content">
            <h3>{appointmentStats.confirmed}</h3>
            <p>Confirmed</p>
          </div>
        </div>

        <div className="stat-card pending">
          <div className="stat-icon">
            <AlertCircle />
          </div>
          <div className="stat-content">
            <h3>{appointmentStats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="appointments-controls">
        <div className="search-section">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search appointments, patients, doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-section">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="not-confirmed">Pending</option>
            <option value="request-cancellation">Cancelled</option>
            <option value="completed">Completed</option>
          </select>

          <select 
            value={doctorFilter} 
            onChange={(e) => setDoctorFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Doctors</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
            ))}
          </select>

          <button 
            className={`filter-btn ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="icon" />
            Filters
          </button>
        </div>

        <div className="view-controls">
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List className="icon" />
            </button>
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="icon" />
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="advanced-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label>Date Range</label>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>
            <div className="filter-group">
              <label>Department</label>
              <select>
                <option value="all">All Departments</option>
                <option value="cardiology">Cardiology</option>
                <option value="general">General Medicine</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="orthopedics">Orthopedics</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Priority</label>
              <select>
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedAppointments.length > 0 && (
        <div className="bulk-actions">
          <span>{selectedAppointments.length} appointment(s) selected</span>
          <div className="bulk-buttons">
            <button onClick={() => handleBulkAction('confirm')} className="bulk-btn confirm">
              <CheckCircle className="icon" />
              Confirm Selected
            </button>
            <button onClick={() => handleBulkAction('cancel')} className="bulk-btn cancel">
              <XCircle className="icon" />
              Cancel Selected
            </button>
            <button onClick={() => handleBulkAction('delete')} className="bulk-btn delete">
              <Trash2 className="icon" />
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Appointments List/Grid */}
      <div className="appointments-content">
        {viewMode === 'list' ? (
          <div className="appointments-table">
            <div className="table-header">
              <div className="header-cell checkbox-cell">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </div>
              <div className="header-cell sortable" onClick={() => handleSort('patientName')}>
                Patient {getSortIcon('patientName')}
              </div>
              <div className="header-cell sortable" onClick={() => handleSort('doctorName')}>
                Doctor {getSortIcon('doctorName')}
              </div>
              <div className="header-cell sortable" onClick={() => handleSort('dateTime')}>
                Date & Time {getSortIcon('dateTime')}
              </div>
              <div className="header-cell">Department</div>
              <div className="header-cell">Visit Type</div>
              <div className="header-cell sortable" onClick={() => handleSort('status')}>
                Status {getSortIcon('status')}
              </div>
              <div className="header-cell">Actions</div>
            </div>

            <div className="table-body">
              {filteredAndSortedAppointments.map(appointment => {
                const { date, time } = formatDateTime(appointment.dateTime);
                return (
                  <div key={appointment.id} className="table-row">
                    <div className="table-cell checkbox-cell">
                      <input
                        type="checkbox"
                        checked={selectedAppointments.includes(appointment.id)}
                        onChange={() => handleSelectAppointment(appointment.id)}
                      />
                    </div>
                    <div className="table-cell">
                      <div className="patient-info">
                        <span className="patient-name">{appointment.patientName}</span>
                        <span className="patient-id">{appointment.patientId}</span>
                      </div>
                    </div>
                    <div className="table-cell">
                      <div className="doctor-info">
                        <span className="doctor-name">{appointment.doctorName}</span>
                        <span className="doctor-dept">{appointment.department}</span>
                      </div>
                    </div>
                    <div className="table-cell">
                      <div className="datetime-info">
                        <span className="date">{date}</span>
                        <span className="time">{time}</span>
                      </div>
                    </div>
                    <div className="table-cell">
                      <span className="department">{appointment.department}</span>
                    </div>
                    <div className="table-cell">
                      <span className="visit-type">{appointment.visitType}</span>
                    </div>
                    <div className="table-cell">
                      <span className={`status ${getStatusClass(appointment.statusType)}`}>
                        {appointment.status}
                      </span>
                      <span className={`priority ${getPriorityClass(appointment.priority)}`}>
                        {appointment.priority}
                      </span>
                    </div>
                    <div className="table-cell actions-cell">
                      <button 
                        className="action-btn-small view"
                        onClick={() => handleViewAppointment(appointment)}
                        title="View Details"
                      >
                        <Eye className="icon" />
                      </button>
                      <button 
                        className="action-btn-small edit"
                        onClick={() => handleEditAppointment(appointment)}
                        title="Edit"
                      >
                        <Edit className="icon" />
                      </button>
                      {appointment.statusType === 'not-confirmed' && (
                        <button 
                          className="action-btn-small confirm"
                          onClick={() => handleConfirmAppointment(appointment.id)}
                          title="Confirm"
                        >
                          <CheckCircle className="icon" />
                        </button>
                      )}
                      <button 
                        className="action-btn-small delete"
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        title="Delete"
                      >
                        <Trash2 className="icon" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="appointments-grid">
            {filteredAndSortedAppointments.map(appointment => {
              const { date, time } = formatDateTime(appointment.dateTime);
              return (
                <div key={appointment.id} className="appointment-card">
                  <div className="card-header">
                    <div className="card-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedAppointments.includes(appointment.id)}
                        onChange={() => handleSelectAppointment(appointment.id)}
                      />
                    </div>
                    <div className="card-id">#{appointment.id}</div>
                    <div className="card-priority">
                      <span className={`priority-badge ${getPriorityClass(appointment.priority)}`}>
                        {appointment.priority}
                      </span>
                    </div>
                  </div>

                  <div className="card-content">
                    <div className="patient-section">
                      <h3>{appointment.patientName}</h3>
                      <p className="patient-id">{appointment.patientId}</p>
                    </div>

                    <div className="appointment-details">
                      <div className="detail-row">
                        <User className="detail-icon" />
                        <span>{appointment.doctorName}</span>
                      </div>
                      <div className="detail-row">
                        <Stethoscope className="detail-icon" />
                        <span>{appointment.department}</span>
                      </div>
                      <div className="detail-row">
                        <Calendar className="detail-icon" />
                        <span>{date}</span>
                      </div>
                      <div className="detail-row">
                        <Clock className="detail-icon" />
                        <span>{time}</span>
                      </div>
                      <div className="detail-row">
                        <MapPin className="detail-icon" />
                        <span>{appointment.roomNumber}</span>
                      </div>
                    </div>

                    <div className="visit-info">
                      <p className="visit-type">{appointment.visitType}</p>
                      <p className="symptoms">{appointment.symptoms}</p>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="status-section">
                      <span className={`status ${getStatusClass(appointment.statusType)}`}>
                        {appointment.status}
                      </span>
                    </div>

                    <div className="card-actions">
                      <button 
                        className="action-btn-small view"
                        onClick={() => handleViewAppointment(appointment)}
                      >
                        <Eye className="icon" />
                      </button>
                      <button 
                        className="action-btn-small edit"
                        onClick={() => handleEditAppointment(appointment)}
                      >
                        <Edit className="icon" />
                      </button>
                      {appointment.statusType === 'not-confirmed' && (
                        <button 
                          className="action-btn-small confirm"
                          onClick={() => handleConfirmAppointment(appointment.id)}
                        >
                          <CheckCircle className="icon" />
                        </button>
                      )}
                      <button 
                        className="action-btn-small delete"
                        onClick={() => handleDeleteAppointment(appointment.id)}
                      >
                        <Trash2 className="icon" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Appointment Details Modal */}
      {showAppointmentDetails && selectedAppointment && (
        <div className="modal-overlay" onClick={() => setShowAppointmentDetails(false)}>
          <div className="modal-content appointment-details-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Appointment Details</h2>
              <button 
                className="close-btn"
                onClick={() => setShowAppointmentDetails(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="details-grid">
                <div className="detail-section">
                  <h3>Patient Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Name:</label>
                      <span>{selectedAppointment.patientName}</span>
                    </div>
                    <div className="info-item">
                      <label>Patient ID:</label>
                      <span>{selectedAppointment.patientId}</span>
                    </div>
                    <div className="info-item">
                      <label>Contact:</label>
                      <span>{selectedAppointment.contactNumber}</span>
                    </div>
                    <div className="info-item">
                      <label>Email:</label>
                      <span>{selectedAppointment.email}</span>
                    </div>
                    <div className="info-item">
                      <label>Insurance:</label>
                      <span>{selectedAppointment.insurance}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Appointment Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Doctor:</label>
                      <span>{selectedAppointment.doctorName}</span>
                    </div>
                    <div className="info-item">
                      <label>Department:</label>
                      <span>{selectedAppointment.department}</span>
                    </div>
                    <div className="info-item">
                      <label>Date & Time:</label>
                      <span>{formatDateTime(selectedAppointment.dateTime).date} at {formatDateTime(selectedAppointment.dateTime).time}</span>
                    </div>
                    <div className="info-item">
                      <label>Duration:</label>
                      <span>{selectedAppointment.duration} minutes</span>
                    </div>
                    <div className="info-item">
                      <label>Room:</label>
                      <span>{selectedAppointment.roomNumber}</span>
                    </div>
                    <div className="info-item">
                      <label>Type:</label>
                      <span>{selectedAppointment.appointmentType}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section full-width">
                  <h3>Medical Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Visit Type:</label>
                      <span>{selectedAppointment.visitType}</span>
                    </div>
                    <div className="info-item">
                      <label>Priority:</label>
                      <span className={`priority-badge ${getPriorityClass(selectedAppointment.priority)}`}>
                        {selectedAppointment.priority}
                      </span>
                    </div>
                    <div className="info-item full-width">
                      <label>Symptoms:</label>
                      <span>{selectedAppointment.symptoms}</span>
                    </div>
                    <div className="info-item full-width">
                      <label>Notes:</label>
                      <span>{selectedAppointment.notes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn secondary"
                onClick={() => setShowAppointmentDetails(false)}
              >
                Close
              </button>
              <button 
                className="btn primary"
                onClick={() => {
                  setShowAppointmentDetails(false);
                  handleEditAppointment(selectedAppointment);
                }}
              >
                Edit Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="modal-overlay">
          <div className="modal-content confirm-dialog">
            <div className="modal-header">
              <h3>Confirm Action</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to perform this action? This cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn secondary"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </button>
              <button 
                className="btn danger"
                onClick={confirmAction}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;