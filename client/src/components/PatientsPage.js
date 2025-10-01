import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, MoreVertical, Phone, Mail, Calendar, 
  Edit, Trash2, Eye, X, Printer, 
  Users, Activity, AlertCircle, CheckCircle, Clock,
  ChevronDown, ChevronUp, Grid, List, SortAsc, SortDesc,
  UserPlus, Heart, Stethoscope, TrendingUp
} from 'lucide-react';
import AddPatientModal from './AddPatientModal';
import EditPatientModal from './EditPatientModal';
import ScheduleAppointmentModal from './ScheduleAppointmentModal';
import EditAppointmentModal from './EditAppointmentModal';
import './PatientsPage.css';

const PatientsPage = ({ patients: propPatients = [], onSavePatient, appointments: propAppointments = [], onSaveAppointment }) => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEditAppointmentModal, setShowEditAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showMoreMenu, setShowMoreMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [patientsPerPage] = useState(12);
  
  // Enhanced sample data with more comprehensive patient information
  const [localPatients, setLocalPatients] = useState([
    {
      id: 1,
      name: 'Willy Ben Chen',
      age: 27,
      gender: 'Male',
      phone: '+1 234-567-8900',
      email: 'willy.chen@email.com',
      lastAppointment: '2024-01-15',
      nextAppointment: '2024-02-15',
      dateOfBirth: '1997-02-10',
      status: 'Stable',
      priority: 'Medium',
      diagnosis: 'Type 2 Diabetes',
      bloodType: 'O+',
      allergies: ['Penicillin'],
      emergencyContact: 'Jane Chen - +1 234-567-8901',
      address: '123 Main St, New York, NY 10001',
      insurance: 'Blue Cross Blue Shield',
      totalVisits: 12,
      lastVitals: { bp: '120/80', temp: '98.6°F', pulse: '72 bpm' },
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Emily Watford',
      age: 37,
      gender: 'Female',
      phone: '+1 234-567-8901',
      email: 'emily.watford@email.com',
      lastAppointment: '2024-01-10',
      nextAppointment: '2024-01-25',
      dateOfBirth: '1987-01-20',
      status: 'Critical',
      priority: 'High',
      diagnosis: 'Hypertension',
      bloodType: 'A+',
      allergies: ['Shellfish', 'Latex'],
      emergencyContact: 'John Watford - +1 234-567-8902',
      address: '456 Oak Ave, Los Angeles, CA 90210',
      insurance: 'Aetna',
      totalVisits: 24,
      lastVitals: { bp: '160/95', temp: '99.1°F', pulse: '88 bpm' },
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Nicholas Robertson',
      age: 25,
      gender: 'Male',
      phone: '+1 234-567-8902',
      email: 'nicholas.robertson@email.com',
      lastAppointment: '2024-01-08',
      nextAppointment: '2024-02-08',
      dateOfBirth: '1999-06-24',
      status: 'Stable',
      priority: 'Low',
      diagnosis: 'Anxiety Disorder',
      bloodType: 'B+',
      allergies: ['None'],
      emergencyContact: 'Sarah Robertson - +1 234-567-8903',
      address: '789 Pine St, Chicago, IL 60601',
      insurance: 'United Healthcare',
      totalVisits: 8,
      lastVitals: { bp: '118/75', temp: '98.4°F', pulse: '68 bpm' },
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Sarah Mitchell',
      age: 32,
      gender: 'Female',
      phone: '+1 234-567-8903',
      email: 'sarah.mitchell@email.com',
      lastAppointment: '2024-01-20',
      nextAppointment: '2024-02-20',
      dateOfBirth: '1992-09-14',
      status: 'Mild',
      priority: 'Medium',
      diagnosis: 'Migraine',
      bloodType: 'AB+',
      allergies: ['Aspirin'],
      emergencyContact: 'David Mitchell - +1 234-567-8904',
      address: '321 Elm St, Houston, TX 77001',
      insurance: 'Cigna',
      totalVisits: 15,
      lastVitals: { bp: '125/82', temp: '98.7°F', pulse: '74 bpm' },
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'James Wang',
      age: 45,
      gender: 'Male',
      phone: '+1 234-567-8904',
      email: 'james.wang@email.com',
      lastAppointment: '2024-01-12',
      nextAppointment: '2024-02-12',
      dateOfBirth: '1979-03-11',
      status: 'Stable',
      priority: 'Medium',
      diagnosis: 'Type 2 Diabetes',
      bloodType: 'O-',
      allergies: ['Sulfa drugs'],
      emergencyContact: 'Lisa Wang - +1 234-567-8905',
      address: '654 Maple Ave, Phoenix, AZ 85001',
      insurance: 'Kaiser Permanente',
      totalVisits: 28,
      lastVitals: { bp: '130/85', temp: '98.5°F', pulse: '76 bpm' },
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 6,
      name: 'Lina Garcia',
      age: 28,
      gender: 'Female',
      phone: '+1 234-567-8905',
      email: 'lina.garcia@email.com',
      lastAppointment: '2024-01-18',
      nextAppointment: '2024-02-18',
      dateOfBirth: '1996-08-05',
      status: 'Mild',
      priority: 'Low',
      diagnosis: 'Skin Allergy',
      bloodType: 'A-',
      allergies: ['Pollen', 'Dust mites'],
      emergencyContact: 'Carlos Garcia - +1 234-567-8906',
      address: '987 Cedar St, Miami, FL 33101',
      insurance: 'Humana',
      totalVisits: 6,
      lastVitals: { bp: '115/70', temp: '98.3°F', pulse: '65 bpm' },
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face'
    }
  ]);
  
  const [localAppointments, setLocalAppointments] = useState([]);

  // Use props if available, otherwise use local state
  const patients = propPatients.length > 0 ? propPatients : localPatients;
  const appointments = propAppointments.length > 0 ? propAppointments : localAppointments;

  // Enhanced filtering and sorting logic
  const filteredAndSortedPatients = useMemo(() => {
    let filtered = patients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || patient.status.toLowerCase() === filterStatus.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });

    // Sort patients
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'age':
          aValue = a.age;
          bValue = b.age;
          break;
        case 'lastAppointment':
          aValue = new Date(a.lastAppointment);
          bValue = new Date(b.lastAppointment);
          break;
        case 'status':
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [patients, searchTerm, filterStatus, sortBy, sortOrder]);

  // Pagination logic
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredAndSortedPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredAndSortedPatients.length / patientsPerPage);

  // Statistics calculations
  const stats = useMemo(() => {
    const total = patients.length;
    const critical = patients.filter(p => p.status === 'Critical').length;
    const stable = patients.filter(p => p.status === 'Stable').length;
    const mild = patients.filter(p => p.status === 'Mild').length;
    const todayAppointments = patients.filter(p => {
      const today = new Date().toISOString().split('T')[0];
      return p.nextAppointment === today;
    }).length;

    return { total, critical, stable, mild, todayAppointments };
  }, [patients]);

  // Event handlers
  const handleAddPatient = () => {
    setShowAddModal(true);
  };

  const handleSavePatient = (patientData) => {
    if (onSavePatient) {
      onSavePatient(patientData);
    } else {
      const newPatient = {
        id: patients.length + 1,
        ...patientData,
        lastAppointment: new Date().toISOString().split('T')[0],
        status: 'Stable',
        totalVisits: 0,
        avatar: `https://images.unsplash.com/photo-${patientData.gender === 'Male' ? '1507003211169-0a1dd7228f2d' : '1494790108755-2616b612b786'}?w=40&h=40&fit=crop&crop=face`
      };
      setLocalPatients([...patients, newPatient]);
    }
    setShowAddModal(false);
  };

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setShowDetailsModal(true);
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setShowEditModal(true);
  };

  const handleScheduleAppointment = (patient) => {
    setSelectedPatient(patient);
    setShowScheduleModal(true);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'critical':
        return <AlertCircle className="status-icon critical" />;
      case 'stable':
        return <CheckCircle className="status-icon stable" />;
      case 'mild':
        return <Clock className="status-icon mild" />;
      default:
        return <Activity className="status-icon" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="patients-page">
      {/* Enhanced Header with Statistics */}
      <div className="patients-header">
        <div className="header-left">
          <h1>Patient Management</h1>
          <p className="page-subtitle">Comprehensive patient care and management system</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => window.print()}>
            <Printer size={16} />
            Print Report
          </button>
          <button className="btn-primary" onClick={handleAddPatient}>
            <UserPlus size={16} />
            Add New Patient
          </button>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Patients</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon critical">
            <AlertCircle size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.critical}</h3>
            <p>Critical Cases</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stable">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.stable}</h3>
            <p>Stable Patients</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon appointments">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.todayAppointments}</h3>
            <p>Today's Appointments</p>
          </div>
        </div>
      </div>

      {/* Enhanced Controls */}
      <div className="patients-controls">
        <div className="controls-row">
          <div className="search-filter-container">
            <div className="search-box">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search patients by name, email, or diagnosis..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-container">
              <Filter className="filter-icon" size={16} />
              <select
                className="filter-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="critical">Critical</option>
                <option value="stable">Stable</option>
                <option value="mild">Mild</option>
              </select>
            </div>

            <button 
              className={`filter-toggle ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              Advanced Filters
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          <div className="view-controls">
            <div className="sort-controls">
              <button 
                className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`}
                onClick={() => handleSort('name')}
              >
                Name {sortBy === 'name' && (sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />)}
              </button>
              <button 
                className={`sort-btn ${sortBy === 'age' ? 'active' : ''}`}
                onClick={() => handleSort('age')}
              >
                Age {sortBy === 'age' && (sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />)}
              </button>
              <button 
                className={`sort-btn ${sortBy === 'lastAppointment' ? 'active' : ''}`}
                onClick={() => handleSort('lastAppointment')}
              >
                Last Visit {sortBy === 'lastAppointment' && (sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />)}
              </button>
            </div>

            <div className="view-mode-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} />
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="advanced-filters">
            <div className="filter-group">
              <label>Age Range:</label>
              <div className="range-inputs">
                <input type="number" placeholder="Min" className="range-input" />
                <span>to</span>
                <input type="number" placeholder="Max" className="range-input" />
              </div>
            </div>
            <div className="filter-group">
              <label>Gender:</label>
              <select className="filter-select">
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Priority:</label>
              <select className="filter-select">
                <option value="">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Insurance:</label>
              <select className="filter-select">
                <option value="">All</option>
                <option value="blue-cross">Blue Cross Blue Shield</option>
                <option value="aetna">Aetna</option>
                <option value="united">United Healthcare</option>
                <option value="cigna">Cigna</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Patients Display */}
      <div className={`patients-container ${viewMode}`}>
        {viewMode === 'grid' ? (
          <div className="patients-grid">
            {currentPatients.map((patient) => (
              <div key={patient.id} className="patient-card">
                <div className="patient-header">
                  <div className="patient-avatar">
                    <img src={patient.avatar} alt={patient.name} />
                    <div 
                      className="priority-indicator" 
                      style={{ backgroundColor: getPriorityColor(patient.priority) }}
                    />
                  </div>
                  <div className="patient-basic-info">
                    <h3>{patient.name}</h3>
                    <p className="patient-age">{patient.age} years • {patient.gender}</p>
                    <div className="patient-status">
                      {getStatusIcon(patient.status)}
                      <span className={`status-text ${patient.status.toLowerCase()}`}>
                        {patient.status}
                      </span>
                    </div>
                  </div>
                  <div className="patient-actions">
                    <button 
                      className="action-btn"
                      onClick={() => setShowMoreMenu(showMoreMenu === patient.id ? null : patient.id)}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {showMoreMenu === patient.id && (
                      <div className="action-menu">
                        <button onClick={() => handleViewDetails(patient)}>
                          <Eye size={14} /> View Details
                        </button>
                        <button onClick={() => handleEditPatient(patient)}>
                          <Edit size={14} /> Edit Patient
                        </button>
                        <button onClick={() => handleScheduleAppointment(patient)}>
                          <Calendar size={14} /> Schedule
                        </button>
                        <button className="danger">
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="patient-details">
                  <div className="detail-row">
                    <Phone size={14} />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="detail-row">
                    <Mail size={14} />
                    <span>{patient.email}</span>
                  </div>
                  <div className="detail-row">
                    <Stethoscope size={14} />
                    <span>{patient.diagnosis}</span>
                  </div>
                  <div className="detail-row">
                    <Calendar size={14} />
                    <span>Last visit: {new Date(patient.lastAppointment).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="patient-vitals">
                  <div className="vital-item">
                    <Heart size={12} />
                    <span>{patient.lastVitals?.bp || 'N/A'}</span>
                  </div>
                  <div className="vital-item">
                    <TrendingUp size={12} />
                    <span>{patient.lastVitals?.pulse || 'N/A'}</span>
                  </div>
                  <div className="vital-item">
                    <Activity size={12} />
                    <span>{patient.totalVisits} visits</span>
                  </div>
                </div>

                <div className="patient-footer">
                  <button 
                    className="btn-outline"
                    onClick={() => handleViewDetails(patient)}
                  >
                    View Full Profile
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={() => handleScheduleAppointment(patient)}
                  >
                    Schedule Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="patients-table">
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort('name')}>
                    Patient {sortBy === 'name' && (sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />)}
                  </th>
                  <th onClick={() => handleSort('age')}>
                    Age {sortBy === 'age' && (sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />)}
                  </th>
                  <th>Contact</th>
                  <th>Diagnosis</th>
                  <th>Status</th>
                  <th onClick={() => handleSort('lastAppointment')}>
                    Last Visit {sortBy === 'lastAppointment' && (sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />)}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>
                      <div className="table-patient-info">
                        <img src={patient.avatar} alt={patient.name} className="table-avatar" />
                        <div>
                          <div className="patient-name">{patient.name}</div>
                          <div className="patient-gender">{patient.gender}</div>
                        </div>
                      </div>
                    </td>
                    <td>{patient.age}</td>
                    <td>
                      <div className="contact-info">
                        <div>{patient.phone}</div>
                        <div className="email">{patient.email}</div>
                      </div>
                    </td>
                    <td>{patient.diagnosis}</td>
                    <td>
                      <div className="table-status">
                        {getStatusIcon(patient.status)}
                        <span className={`status-text ${patient.status.toLowerCase()}`}>
                          {patient.status}
                        </span>
                      </div>
                    </td>
                    <td>{new Date(patient.lastAppointment).toLocaleDateString()}</td>
                    <td>
                      <div className="table-actions">
                        <button 
                          className="action-btn"
                          onClick={() => handleViewDetails(patient)}
                          title="View Details"
                        >
                          <Eye size={14} />
                        </button>
                        <button 
                          className="action-btn"
                          onClick={() => handleEditPatient(patient)}
                          title="Edit Patient"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          className="action-btn"
                          onClick={() => handleScheduleAppointment(patient)}
                          title="Schedule Appointment"
                        >
                          <Calendar size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <div className="pagination-info">
            Showing {indexOfFirstPatient + 1}-{Math.min(indexOfLastPatient, filteredAndSortedPatients.length)} of {filteredAndSortedPatients.length} patients
          </div>
          <div className="pagination-controls">
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </button>
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              if (page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)) {
                return (
                  <button
                    key={page}
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 3 || page === currentPage + 3) {
                return <span key={page} className="pagination-ellipsis">...</span>;
              }
              return null;
            })}
            
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        </div>
      )}

      {/* Patient Details Modal */}
      {showDetailsModal && selectedPatient && (
        <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
          <div className="modal-content patient-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Patient Details</h2>
              <button className="modal-close" onClick={() => setShowDetailsModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="patient-details-content">
              <div className="patient-profile-section">
                <div className="profile-header">
                  <img src={selectedPatient.avatar} alt={selectedPatient.name} className="profile-avatar" />
                  <div className="profile-info">
                    <h3>{selectedPatient.name}</h3>
                    <p>{selectedPatient.age} years old • {selectedPatient.gender}</p>
                    <div className="profile-status">
                      {getStatusIcon(selectedPatient.status)}
                      <span className={`status-text ${selectedPatient.status.toLowerCase()}`}>
                        {selectedPatient.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="details-grid">
                <div className="details-section">
                  <h4>Contact Information</h4>
                  <div className="detail-item">
                    <Phone size={16} />
                    <span>{selectedPatient.phone}</span>
                  </div>
                  <div className="detail-item">
                    <Mail size={16} />
                    <span>{selectedPatient.email}</span>
                  </div>
                  <div className="detail-item">
                    <span>📍</span>
                    <span>{selectedPatient.address}</span>
                  </div>
                </div>

                <div className="details-section">
                  <h4>Medical Information</h4>
                  <div className="detail-item">
                    <Stethoscope size={16} />
                    <span>{selectedPatient.diagnosis}</span>
                  </div>
                  <div className="detail-item">
                    <span>🩸</span>
                    <span>Blood Type: {selectedPatient.bloodType}</span>
                  </div>
                  <div className="detail-item">
                    <span>⚠️</span>
                    <span>Allergies: {selectedPatient.allergies.join(', ')}</span>
                  </div>
                </div>

                <div className="details-section">
                  <h4>Appointment History</h4>
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span>Last Visit: {new Date(selectedPatient.lastAppointment).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <Calendar size={16} />
                    <span>Next Appointment: {selectedPatient.nextAppointment ? new Date(selectedPatient.nextAppointment).toLocaleDateString() : 'Not scheduled'}</span>
                  </div>
                  <div className="detail-item">
                    <Activity size={16} />
                    <span>Total Visits: {selectedPatient.totalVisits}</span>
                  </div>
                </div>

                <div className="details-section">
                  <h4>Emergency Contact</h4>
                  <div className="detail-item">
                    <Phone size={16} />
                    <span>{selectedPatient.emergencyContact}</span>
                  </div>
                </div>

                <div className="details-section">
                  <h4>Insurance</h4>
                  <div className="detail-item">
                    <span>🏥</span>
                    <span>{selectedPatient.insurance}</span>
                  </div>
                </div>

                <div className="details-section">
                  <h4>Last Vitals</h4>
                  <div className="vitals-grid">
                    <div className="vital-card">
                      <Heart size={16} />
                      <span>Blood Pressure</span>
                      <strong>{selectedPatient.lastVitals?.bp}</strong>
                    </div>
                    <div className="vital-card">
                      <Activity size={16} />
                      <span>Pulse</span>
                      <strong>{selectedPatient.lastVitals?.pulse}</strong>
                    </div>
                    <div className="vital-card">
                      <span>🌡️</span>
                      <span>Temperature</span>
                      <strong>{selectedPatient.lastVitals?.temp}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setShowDetailsModal(false)}>
                Close
              </button>
              <button className="btn-secondary" onClick={() => {
                setShowDetailsModal(false);
                handleEditPatient(selectedPatient);
              }}>
                <Edit size={16} />
                Edit Patient
              </button>
              <button className="btn-primary" onClick={() => {
                setShowDetailsModal(false);
                handleScheduleAppointment(selectedPatient);
              }}>
                <Calendar size={16} />
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <AddPatientModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSavePatient}
        />
      )}

      {showEditModal && selectedPatient && (
        <EditPatientModal
          patient={selectedPatient}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedPatient) => {
            // Handle patient update
            setShowEditModal(false);
          }}
        />
      )}

      {showScheduleModal && selectedPatient && (
        <ScheduleAppointmentModal
          patient={selectedPatient}
          onClose={() => setShowScheduleModal(false)}
          onSave={(appointmentData) => {
            // Handle appointment scheduling
            setShowScheduleModal(false);
          }}
        />
      )}

      {showEditAppointmentModal && selectedAppointment && (
        <EditAppointmentModal
          appointment={selectedAppointment}
          onClose={() => setShowEditAppointmentModal(false)}
          onSave={(updatedAppointment) => {
            // Handle appointment update
            setShowEditAppointmentModal(false);
          }}
        />
      )}
    </div>
  );
};

export default PatientsPage;