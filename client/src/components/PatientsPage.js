import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Phone, Mail, Calendar, MapPin, Edit, Trash2, Eye, X } from 'lucide-react';
import './PatientsPage.css';

const PatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showMoreMenu, setShowMoreMenu] = useState(null);
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Smith',
      age: 45,
      gender: 'Male',
      phone: '+1 234-567-8900',
      email: 'john.smith@email.com',
      lastVisit: '2023-09-25',
      status: 'Active',
      condition: 'Hypertension',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      age: 32,
      gender: 'Female',
      phone: '+1 234-567-8901',
      email: 'sarah.johnson@email.com',
      lastVisit: '2023-09-28',
      status: 'Active',
      condition: 'Diabetes',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Michael Brown',
      age: 28,
      gender: 'Male',
      phone: '+1 234-567-8902',
      email: 'michael.brown@email.com',
      lastVisit: '2023-09-20',
      status: 'Inactive',
      condition: 'Asthma',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Emily Davis',
      age: 38,
      gender: 'Female',
      phone: '+1 234-567-8903',
      email: 'emily.davis@email.com',
      lastVisit: '2023-09-30',
      status: 'Active',
      condition: 'Migraine',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    }
  ]);

  // Patient management functions
  const handleAddPatient = () => {
    setShowAddModal(true);
  };

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setShowDetailsModal(true);
  };

  const handleScheduleAppointment = (patient) => {
    alert(`Scheduling appointment for ${patient.name}...`);
    // In a real app, this would open an appointment booking modal
  };

  const handleEditPatient = (patient) => {
    alert(`Editing patient: ${patient.name}`);
    setShowMoreMenu(null);
    // In a real app, this would open an edit modal
  };

  const handleDeletePatient = (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter(p => p.id !== patientId));
      setShowMoreMenu(null);
      alert('Patient deleted successfully');
    }
  };

  const handleMoreMenu = (patientId) => {
    setShowMoreMenu(showMoreMenu === patientId ? null : patientId);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowDetailsModal(false);
    setSelectedPatient(null);
    setShowMoreMenu(null);
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || patient.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="patients-page">
      <div className="patients-header">
        <div className="header-left">
          <h1 className="page-title">Patients Management</h1>
          <p className="page-subtitle">Manage and view all patient information</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddPatient}>
          <Plus className="btn-icon" />
          Add New Patient
        </button>
      </div>

      <div className="patients-controls">
        <div className="search-filter-container">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-container">
            <Filter className="filter-icon" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="patients-grid">
        {filteredPatients.map(patient => (
          <div key={patient.id} className="patient-card">
            <div className="patient-header">
              <div className="patient-avatar">
                <img src={patient.avatar} alt={patient.name} />
              </div>
              <div className="patient-info">
                <h3 className="patient-name">{patient.name}</h3>
                <p className="patient-details">{patient.age} years • {patient.gender}</p>
              </div>
              <div className="patient-status">
                <span className={`status-badge ${patient.status.toLowerCase()}`}>
                  {patient.status}
                </span>
                <button 
                  className="more-btn"
                  onClick={() => handleMoreMenu(patient.id)}
                >
                  <MoreVertical size={16} />
                </button>
                {showMoreMenu === patient.id && (
                  <div className="more-menu">
                    <button onClick={() => handleEditPatient(patient)}>
                      <Edit size={14} />
                      Edit Patient
                    </button>
                    <button onClick={() => handleDeletePatient(patient.id)} className="delete-btn">
                      <Trash2 size={14} />
                      Delete Patient
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="patient-body">
              <div className="condition-info">
                <h4>Primary Condition</h4>
                <p>{patient.condition}</p>
              </div>

              <div className="contact-info">
                <div className="contact-item">
                  <Phone size={14} />
                  <span>{patient.phone}</span>
                </div>
                <div className="contact-item">
                  <Mail size={14} />
                  <span>{patient.email}</span>
                </div>
                <div className="contact-item">
                  <Calendar size={14} />
                  <span>Last visit: {patient.lastVisit}</span>
                </div>
              </div>
            </div>

            <div className="patient-actions">
              <button 
                className="btn btn-outline"
                onClick={() => handleViewDetails(patient)}
              >
                View Details
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => handleScheduleAppointment(patient)}
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <Search size={48} />
          </div>
          <h3>No patients found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Patient</h2>
              <button className="close-btn" onClick={closeModals}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p>Add new patient form would go here...</p>
              <div className="modal-actions">
                <button className="btn btn-outline" onClick={closeModals}>Cancel</button>
                <button className="btn btn-primary">Add Patient</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Patient Details Modal */}
      {showDetailsModal && selectedPatient && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Patient Details</h2>
              <button className="close-btn" onClick={closeModals}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="patient-details-content">
                <img src={selectedPatient.avatar} alt={selectedPatient.name} className="detail-avatar" />
                <h3>{selectedPatient.name}</h3>
                <p><strong>Age:</strong> {selectedPatient.age} years</p>
                <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                <p><strong>Phone:</strong> {selectedPatient.phone}</p>
                <p><strong>Email:</strong> {selectedPatient.email}</p>
                <p><strong>Last Visit:</strong> {selectedPatient.lastVisit}</p>
                <p><strong>Status:</strong> {selectedPatient.status}</p>
                <p><strong>Condition:</strong> {selectedPatient.condition}</p>
              </div>
              <div className="modal-actions">
                <button className="btn btn-outline" onClick={closeModals}>Close</button>
                <button className="btn btn-primary" onClick={() => handleScheduleAppointment(selectedPatient)}>
                  Schedule Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsPage;