import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Phone, Mail, Calendar, MapPin, Edit, Trash2, Eye, X, Download, FileText, Printer } from 'lucide-react';
import AddPatientModal from './AddPatientModal';
import EditPatientModal from './EditPatientModal';
import ScheduleAppointmentModal from './ScheduleAppointmentModal';
import EditAppointmentModal from './EditAppointmentModal';
import './PatientsPage.css';

const PatientsPage = ({ patients: propPatients = [], onSavePatient, appointments: propAppointments = [], onSaveAppointment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEditAppointmentModal, setShowEditAppointmentModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showMoreMenu, setShowMoreMenu] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(10);
  
  // Use props if available, otherwise fall back to local state
  const [localPatients, setLocalPatients] = useState([
    {
      id: 1,
      name: 'Willy Ben Chen',
      age: 27,
      gender: 'Male',
      phone: '+1 234-567-8900',
      email: 'willy.chen@email.com',
      lastAppointment: '10-04-2023',
      dateOfBirth: '10-02-1998',
      status: 'Stable',
      diagnosis: 'Diabetes',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Emily Watford',
      age: 37,
      gender: 'Female',
      phone: '+1 234-567-8901',
      email: 'emily.watford@email.com',
      lastAppointment: '09-04-2023',
      dateOfBirth: '20-01-1986',
      status: 'Critical',
      diagnosis: 'Hypertension',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Nicholas Robertson',
      age: 25,
      gender: 'Male',
      phone: '+1 234-567-8902',
      email: 'nicholas.robertson@email.com',
      lastAppointment: '08-04-2023',
      dateOfBirth: '24-06-1999',
      status: 'Stable',
      diagnosis: 'Anxiety Disorder',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Sarah Mitchell',
      age: 32,
      gender: 'Female',
      phone: '+1 234-567-8903',
      email: 'sarah.mitchell@email.com',
      lastAppointment: '25-04-2023',
      dateOfBirth: '14-09-1992',
      status: 'Mild',
      diagnosis: 'Hypertension',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'James Wang',
      age: 45,
      gender: 'Male',
      phone: '+1 234-567-8904',
      email: 'james.wang@email.com',
      lastAppointment: '23-04-2023',
      dateOfBirth: '11-03-1980',
      status: 'Stable',
      diagnosis: 'Type 2 Diabetes',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 6,
      name: 'Lina Garcia',
      age: 28,
      gender: 'Female',
      phone: '+1 234-567-8905',
      email: 'lina.garcia@email.com',
      lastAppointment: '20-04-2023',
      dateOfBirth: '05-08-1996',
      status: 'Mild',
      diagnosis: 'Skin Allergy',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 7,
      name: 'Ahmed Ibrahim',
      age: 54,
      gender: 'Male',
      phone: '+1 234-567-8906',
      email: 'ahmed.ibrahim@email.com',
      lastAppointment: '24-04-2023',
      dateOfBirth: '19-12-1970',
      status: 'Critical',
      diagnosis: 'Heart Failure',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 8,
      name: 'Emily Tan',
      age: 36,
      gender: 'Female',
      phone: '+1 234-567-8907',
      email: 'emily.tan@email.com',
      lastAppointment: '18-04-2023',
      dateOfBirth: '22-05-1989',
      status: 'Mild',
      diagnosis: 'Anxiety Disorder',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 9,
      name: 'David Kim',
      age: 40,
      gender: 'Male',
      phone: '+1 234-567-8908',
      email: 'david.kim@email.com',
      lastAppointment: '21-04-2023',
      dateOfBirth: '07-05-1984',
      status: 'Stable',
      diagnosis: 'Asthma',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 10,
      name: 'Maria Rodriguez',
      age: 29,
      gender: 'Female',
      phone: '+1 234-567-8909',
      email: 'maria.rodriguez@email.com',
      lastAppointment: '22-04-2023',
      dateOfBirth: '30-05-1995',
      status: 'Mild',
      diagnosis: 'Gastritis',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face'
    }
  ]);
  
  const [localAppointments, setLocalAppointments] = useState([]);

  // Use props if available, otherwise use local state
  const patients = propPatients.length > 0 ? propPatients : localPatients;
  const appointments = propAppointments.length > 0 ? propAppointments : localAppointments;

  // Patient management functions
  const handleAddPatient = () => {
    setShowAddModal(true);
  };

  const handleSavePatient = (patientData) => {
    if (onSavePatient) {
      // Use the parent's save function if available
      onSavePatient(patientData);
    } else {
      // Fall back to local state management
      const newPatient = {
        id: patients.length + 1,
        name: patientData.name, // Use the name field directly from AddPatientModal
        age: patientData.age,
        gender: patientData.gender,
        phone: patientData.phone,
        email: patientData.email,
        lastVisit: new Date().toISOString().split('T')[0],
        status: 'Active',
        condition: patientData.condition || 'General',
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

  const handleScheduleAppointment = (patient) => {
    setSelectedPatient(patient);
    setShowScheduleModal(true);
  };

  const handlePrintDetails = (patient) => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    // Generate the print content
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Patient Details - ${patient.name}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              line-height: 1.6;
              color: #333;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #3b82f6;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .clinic-name {
              font-size: 24px;
              font-weight: bold;
              color: #3b82f6;
              margin-bottom: 5px;
            }
            .document-title {
              font-size: 18px;
              color: #666;
            }
            .patient-info {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-bottom: 30px;
            }
            .info-section {
              background: #f8fafc;
              padding: 15px;
              border-radius: 8px;
              border-left: 4px solid #3b82f6;
            }
            .section-title {
              font-size: 16px;
              font-weight: bold;
              color: #1e293b;
              margin-bottom: 10px;
              border-bottom: 1px solid #e2e8f0;
              padding-bottom: 5px;
            }
            .info-item {
              margin-bottom: 8px;
            }
            .label {
              font-weight: 600;
              color: #475569;
              display: inline-block;
              width: 120px;
            }
            .value {
              color: #1e293b;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              font-size: 12px;
              color: #64748b;
              border-top: 1px solid #e2e8f0;
              padding-top: 20px;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="clinic-name">HealthCare Clinic</div>
            <div class="document-title">Patient Details Report</div>
          </div>
          
          <div class="patient-info">
            <div class="info-section">
              <div class="section-title">Personal Information</div>
              <div class="info-item">
                <span class="label">Patient ID:</span>
                <span class="value">${patient.id}</span>
              </div>
              <div class="info-item">
                <span class="label">Full Name:</span>
                <span class="value">${patient.name}</span>
              </div>
              <div class="info-item">
                <span class="label">Age:</span>
                <span class="value">${patient.age} years</span>
              </div>
              <div class="info-item">
                <span class="label">Gender:</span>
                <span class="value">${patient.gender}</span>
              </div>
              <div class="info-item">
                <span class="label">Date of Birth:</span>
                <span class="value">${patient.dateOfBirth || 'Not specified'}</span>
              </div>
            </div>
            
            <div class="info-section">
              <div class="section-title">Contact Information</div>
              <div class="info-item">
                <span class="label">Phone:</span>
                <span class="value">${patient.phone}</span>
              </div>
              <div class="info-item">
                <span class="label">Email:</span>
                <span class="value">${patient.email}</span>
              </div>
              <div class="info-item">
                <span class="label">Address:</span>
                <span class="value">${patient.address}</span>
              </div>
              <div class="info-item">
                <span class="label">Emergency Contact:</span>
                <span class="value">${patient.emergencyContact || 'Not specified'}</span>
              </div>
            </div>
            
            <div class="info-section">
              <div class="section-title">Medical Information</div>
              <div class="info-item">
                <span class="label">Blood Type:</span>
                <span class="value">${patient.bloodType || 'Not specified'}</span>
              </div>
              <div class="info-item">
                <span class="label">Allergies:</span>
                <span class="value">${patient.allergies || 'None reported'}</span>
              </div>
              <div class="info-item">
                <span class="label">Medical History:</span>
                <span class="value">${patient.medicalHistory || 'No significant history'}</span>
              </div>
              <div class="info-item">
                <span class="label">Current Medications:</span>
                <span class="value">${patient.medications || 'None'}</span>
              </div>
            </div>
            
            <div class="info-section">
              <div class="section-title">Insurance & Billing</div>
              <div class="info-item">
                <span class="label">Insurance Provider:</span>
                <span class="value">${patient.insurance || 'Not specified'}</span>
              </div>
              <div class="info-item">
                <span class="label">Policy Number:</span>
                <span class="value">${patient.policyNumber || 'Not specified'}</span>
              </div>
              <div class="info-item">
                <span class="label">Registration Date:</span>
                <span class="value">${patient.registrationDate || 'Not specified'}</span>
              </div>
              <div class="info-item">
                <span class="label">Last Visit:</span>
                <span class="value">${patient.lastVisit || 'No previous visits'}</span>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            <p>This document contains confidential patient information</p>
          </div>
        </body>
      </html>
    `;
    
    // Write content to the new window and print
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = function() {
      printWindow.print();
      printWindow.close();
    };
  };

  const handleSaveAppointment = (appointmentData) => {
    if (onSaveAppointment) {
      // Use the parent's save function if available
      onSaveAppointment(appointmentData);
    } else {
      // Fall back to local state management
      setLocalAppointments([...appointments, appointmentData]);
    }
    setShowScheduleModal(false);
    setSelectedPatient(null);
    alert(`Appointment scheduled successfully for ${appointmentData.patientName}!`);
  };

  const handleEditAppointment = (patient, appointment = null) => {
    setSelectedPatient(patient);
    setSelectedAppointment(appointment);
    setShowEditAppointmentModal(true);
    setShowMoreMenu(null);
  };

  const handleSaveEditedAppointment = (appointmentData) => {
    if (onSaveAppointment) {
      // Use the parent's save function if available
      onSaveAppointment(appointmentData);
    } else {
      // Fall back to local state management
      // In a real app, this would update the existing appointment
      console.log('Appointment updated:', appointmentData);
    }
    setShowEditAppointmentModal(false);
    setSelectedPatient(null);
    setSelectedAppointment(null);
    alert(`Appointment ${appointmentData.receiptId} updated successfully!`);
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setShowEditModal(true);
    setShowMoreMenu(null);
  };

  const handleSaveEditedPatient = (updatedPatient) => {
    if (onSavePatient) {
      // Use the parent's save function if available
      onSavePatient(updatedPatient);
    } else {
      // Fall back to local state management
      setLocalPatients(patients.map(p => 
        p.id === updatedPatient.id ? updatedPatient : p
      ));
    }
    setShowEditModal(false);
    setSelectedPatient(null);
    alert(`Patient ${updatedPatient.name} updated successfully!`);
  };

  const handleDeletePatient = (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      if (propPatients.length > 0) {
        // If using props, we can't directly delete - would need a callback from parent
        alert('Delete functionality requires backend integration');
      } else {
        setLocalPatients(patients.filter(p => p.id !== patientId));
        alert('Patient deleted successfully');
      }
      setShowMoreMenu(null);
    }
  };

  const handleMoreMenu = (patientId) => {
    setShowMoreMenu(showMoreMenu === patientId ? null : patientId);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDetailsModal(false);
    setShowScheduleModal(false);
    setShowEditAppointmentModal(false);
    setSelectedPatient(null);
    setSelectedAppointment(null);
    setShowMoreMenu(null);
  };

  // Export functions
  const exportToPDF = () => {
    // Create PDF content
    const patientsData = patients.map(patient => ({
      ID: patient.id,
      Name: patient.name,
      Age: patient.age,
      Gender: patient.gender,
      Phone: patient.phone,
      Email: patient.email,
      Condition: patient.condition,
      'Last Visit': patient.lastVisit,
      Status: patient.status
    }));

    // Simple PDF generation using browser print
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Patients Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .header { text-align: center; margin-bottom: 30px; }
            .date { color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Patients Report</h1>
            <p class="date">Generated on: ${new Date().toLocaleDateString()}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Condition</th>
                <th>Last Visit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${patientsData.map(patient => `
                <tr>
                  <td>${patient.ID}</td>
                  <td>${patient.Name}</td>
                  <td>${patient.Age}</td>
                  <td>${patient.Gender}</td>
                  <td>${patient.Phone}</td>
                  <td>${patient.Email}</td>
                  <td>${patient.Condition}</td>
                  <td>${patient['Last Visit']}</td>
                  <td>${patient.Status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const exportToExcel = () => {
    // Create CSV content (Excel compatible)
    const headers = ['ID', 'Name', 'Age', 'Gender', 'Phone', 'Email', 'Condition', 'Last Visit', 'Status'];
    const csvContent = [
      headers.join(','),
      ...patients.map(patient => [
        patient.id,
        `"${patient.name}"`,
        patient.age,
        patient.gender,
        `"${patient.phone}"`,
        `"${patient.email}"`,
        `"${patient.condition}"`,
        patient.lastVisit,
        patient.status
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `patients_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || patient.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPatients = filteredPatients.length;
  const totalPages = Math.ceil(totalPatients / patientsPerPage);
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Reset to first page when search or filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  return (
    <div className="patients-page">
      <div className="patients-header">
        <div className="header-left">
          <h1 className="page-title">Patients Management</h1>
          <p className="page-subtitle">Manage and view all patient information</p>
        </div>
        <div className="header-actions">
          <div className="download-buttons">
            <button className="btn btn-secondary" onClick={exportToPDF} title="Export to PDF">
              <FileText className="btn-icon" />
              PDF
            </button>
            <button className="btn btn-secondary" onClick={exportToExcel} title="Export to Excel">
              <Download className="btn-icon" />
              Excel
            </button>
          </div>
          <button className="btn btn-primary" onClick={handleAddPatient}>
            <Plus className="btn-icon" />
            Add New Patient
          </button>
        </div>
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

      {/* Pagination and Results Info */}
      <div className="pagination-container">
        <div className="results-info">
          <span>Showing {indexOfFirstPatient + 1} to {Math.min(indexOfLastPatient, totalPatients)} of {totalPatients} entries</span>
        </div>
        
        <div className="pagination-controls">
          <button 
            className="pagination-btn prev-btn" 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              const isCurrentPage = pageNumber === currentPage;
              
              // Show first page, last page, current page, and pages around current page
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    className={`page-number ${isCurrentPage ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return <span key={pageNumber} className="page-ellipsis">...</span>;
              }
              return null;
            })}
          </div>
          
          <button 
            className="pagination-btn next-btn" 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <div className="patients-list-container">
        <div className="patients-table">
          <table className="patients-table-element">
            <thead>
              <tr className="table-header-row">
                <th className="table-header-cell">Name</th>
                <th className="table-header-cell">Last appointment</th>
                <th className="table-header-cell">Age</th>
                <th className="table-header-cell">Date of birth</th>
                <th className="table-header-cell">Gender</th>
                <th className="table-header-cell">Diagnosis</th>
                <th className="table-header-cell">Status</th>
                <th className="table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map(patient => (
                <tr key={patient.id} className="table-body-row">
                  <td className="table-cell name-cell">
                    <div className="patient-info-cell">
                      <div className="patient-avatar">
                        <img src={patient.avatar} alt={patient.name} />
                      </div>
                      <span className="patient-name">{patient.name}</span>
                    </div>
                  </td>
                  <td className="table-cell">{patient.lastAppointment}</td>
                  <td className="table-cell">{patient.age}</td>
                  <td className="table-cell">{patient.dateOfBirth}</td>
                  <td className="table-cell">{patient.gender}</td>
                  <td className="table-cell">
                    <span className="diagnosis-text">{patient.diagnosis}</span>
                  </td>
                  <td className="table-cell">
                    <span className={`status-badge ${patient.status.toLowerCase()}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="table-cell actions-cell">
                    <div className="action-buttons">
                      <button 
                        className="action-btn view-btn"
                        onClick={() => handleViewDetails(patient)}
                        title="View Details"
                      >
                        <Eye size={14} />
                      </button>
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => handleEditPatient(patient)}
                        title="Edit Patient"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        className="action-btn schedule-btn"
                        onClick={() => handleScheduleAppointment(patient)}
                        title="Schedule Appointment"
                      >
                        <Calendar size={14} />
                      </button>
                      <button 
                        className="action-btn more-btn"
                        onClick={() => handleMoreMenu(patient.id)}
                        title="More Options"
                      >
                        <MoreVertical size={14} />
                      </button>
                      {showMoreMenu === patient.id && (
                        <div className="more-menu">
                          <button onClick={() => handleDeletePatient(patient.id)} className="delete-btn">
                            <Trash2 size={14} />
                            Delete Patient
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

        {currentPatients.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <Search size={48} />
          </div>
          <h3>No patients found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Add Patient Modal */}
      <AddPatientModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSavePatient}
      />

      {/* Edit Patient Modal */}
      <EditPatientModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveEditedPatient}
        patient={selectedPatient}
      />

      {/* Patient Details Modal */}
      {showDetailsModal && selectedPatient && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content patient-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Patient Details</h2>
              <button className="close-btn" onClick={closeModals}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="patient-details-content">
                <div className="patient-header-info">
                  <div className="patient-photo-section">
                    <img src={selectedPatient.avatar} alt={selectedPatient.name} className="detail-avatar-large" />
                    <div className="photo-overlay">
                      <button className="photo-edit-btn" title="Change Photo">
                        <Edit size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="patient-basic-info">
                    <h3>{selectedPatient.name}</h3>
                    <span className={`status-badge ${selectedPatient.status.toLowerCase()}`}>
                      {selectedPatient.status}
                    </span>
                    <p className="patient-id">Patient ID: #{selectedPatient.id.toString().padStart(4, '0')}</p>
                  </div>
                </div>
                
                <div className="patient-info-grid">
                  <div className="info-section">
                    <h4>Personal Information</h4>
                    <div className="info-item">
                      <strong>Age:</strong> {selectedPatient.age} years
                    </div>
                    <div className="info-item">
                      <strong>Gender:</strong> {selectedPatient.gender}
                    </div>
                  </div>

                  <div className="info-section">
                    <h4>Contact Information</h4>
                    <div className="info-item">
                      <Phone size={16} />
                      <span>{selectedPatient.phone}</span>
                    </div>
                    <div className="info-item">
                      <Mail size={16} />
                      <span>{selectedPatient.email}</span>
                    </div>
                  </div>

                  <div className="info-section">
                    <h4>Medical Information</h4>
                    <div className="info-item">
                      <strong>Primary Condition:</strong> {selectedPatient.condition}
                    </div>
                    <div className="info-item">
                      <Calendar size={16} />
                      <span>Last Visit: {selectedPatient.lastVisit}</span>
                    </div>
                  </div>

                  <div className="info-section">
                    <h4>Recent Activity</h4>
                    <div className="activity-item">
                      <div className="activity-date">{selectedPatient.lastVisit}</div>
                      <div className="activity-desc">Regular checkup completed</div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-date">2023-09-15</div>
                      <div className="activity-desc">Lab results reviewed</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <div className="action-group primary-actions">
                  <button className="btn btn-outline" onClick={closeModals}>
                    <X size={16} />
                    Close Form
                  </button>
                  <button className="btn btn-secondary" onClick={() => handlePrintDetails(selectedPatient)}>
                    <Printer size={16} />
                    Print Details
                  </button>
                </div>
                <div className="action-group secondary-actions">
                  <button className="btn btn-secondary" onClick={() => handleEditPatient(selectedPatient)}>
                    <Edit size={16} />
                    Edit Info
                  </button>
                  <button className="btn btn-secondary" onClick={() => handleEditAppointment(selectedPatient)}>
                    <Calendar size={16} />
                    Edit Appointment
                  </button>
                  <button className="btn btn-primary schedule-appointment-btn" onClick={() => handleScheduleAppointment(selectedPatient)}>
                    <Calendar size={16} />
                    Schedule Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Appointment Modal */}
      <ScheduleAppointmentModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSave={handleSaveAppointment}
        patient={selectedPatient}
      />

      {/* Edit Appointment Modal */}
      <EditAppointmentModal
        isOpen={showEditAppointmentModal}
        onClose={() => setShowEditAppointmentModal(false)}
        onSave={handleSaveEditedAppointment}
        patient={selectedPatient}
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default PatientsPage;