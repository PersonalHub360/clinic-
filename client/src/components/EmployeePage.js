import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  Award, 
  TrendingUp,
  UserCheck,
  UserX,
  Settings,
  X,
  Save
} from 'lucide-react';
import './EmployeePage.css';

const EmployeePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  
  // Modal states
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showEditEmployeeModal, setShowEditEmployeeModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Sample employee data
  const employees = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      role: 'Senior Doctor',
      department: 'Cardiology',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face',
      email: 'sarah.wilson@clinic.com',
      phone: '+1 (555) 123-4567',
      address: '123 Medical St, City',
      status: 'active',
      joinDate: '2020-03-15',
      salary: '$120,000',
      rating: 4.8,
      patients: 156,
      experience: '8 years',
      schedule: 'Mon-Fri 9AM-5PM',
      specialization: 'Interventional Cardiology'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Nurse',
      department: 'Emergency',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face',
      email: 'michael.chen@clinic.com',
      phone: '+1 (555) 987-6543',
      address: '456 Health Ave, City',
      status: 'active',
      joinDate: '2021-07-20',
      salary: '$65,000',
      rating: 4.6,
      patients: 89,
      experience: '5 years',
      schedule: 'Rotating Shifts',
      specialization: 'Emergency Care'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Receptionist',
      department: 'Administration',
      avatar: 'https://images.unsplash.com/photo-1594824388853-d0c2d4e5b5e5?w=80&h=80&fit=crop&crop=face',
      email: 'emily.rodriguez@clinic.com',
      phone: '+1 (555) 456-7890',
      address: '789 Admin Blvd, City',
      status: 'active',
      joinDate: '2022-01-10',
      salary: '$45,000',
      rating: 4.9,
      patients: 0,
      experience: '3 years',
      schedule: 'Mon-Fri 8AM-4PM',
      specialization: 'Patient Relations'
    },
    {
      id: 4,
      name: 'Dr. Robert Kim',
      role: 'Doctor',
      department: 'Pediatrics',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=80&h=80&fit=crop&crop=face',
      email: 'robert.kim@clinic.com',
      phone: '+1 (555) 321-0987',
      address: '321 Pediatric Way, City',
      status: 'on-leave',
      joinDate: '2019-09-05',
      salary: '$110,000',
      rating: 4.7,
      patients: 134,
      experience: '10 years',
      schedule: 'Mon-Thu 10AM-6PM',
      specialization: 'Child Development'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'Lab Technician',
      department: 'Laboratory',
      avatar: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=80&h=80&fit=crop&crop=face',
      email: 'lisa.thompson@clinic.com',
      phone: '+1 (555) 654-3210',
      address: '654 Lab Street, City',
      status: 'active',
      joinDate: '2021-11-12',
      salary: '$55,000',
      rating: 4.5,
      patients: 0,
      experience: '4 years',
      schedule: 'Mon-Fri 7AM-3PM',
      specialization: 'Clinical Diagnostics'
    }
  ];

  const departments = ['all', 'Cardiology', 'Emergency', 'Administration', 'Pediatrics', 'Laboratory'];
  const statuses = ['all', 'active', 'on-leave', 'inactive'];

  const stats = [
    {
      title: 'Total Employees',
      value: '24',
      change: '+2',
      icon: Users,
      color: '#10b981'
    },
    {
      title: 'Active Staff',
      value: '22',
      change: '+1',
      icon: UserCheck,
      color: '#3b82f6'
    },
    {
      title: 'On Leave',
      value: '2',
      change: '0',
      icon: UserX,
      color: '#f59e0b'
    },
    {
      title: 'Avg Rating',
      value: '4.7',
      change: '+0.2',
      icon: Star,
      color: '#8b5cf6'
    }
  ];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: '#059669', bg: '#dcfce7', text: 'Active' },
      'on-leave': { color: '#d97706', bg: '#fef3c7', text: 'On Leave' },
      inactive: { color: '#dc2626', bg: '#fef2f2', text: 'Inactive' }
    };
    
    const config = statusConfig[status] || statusConfig.active;
    
    return (
      <span 
        className="status-badge" 
        style={{ color: config.color, backgroundColor: config.bg }}
      >
        {config.text}
      </span>
    );
  };

  const renderStarRating = (rating) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={star <= rating ? 'star-filled' : 'star-empty'}
          />
        ))}
        <span className="rating-text">({rating})</span>
      </div>
    );
  };

  // Employee management functions
  const handleAddEmployee = () => {
    setShowAddEmployeeModal(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowEditEmployeeModal(true);
  };

  const handleDeleteEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteConfirm(true);
  };

  const handleScheduleEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowScheduleModal(true);
  };

  const confirmDeleteEmployee = () => {
    alert(`Employee ${selectedEmployee.name} has been deleted successfully!`);
    closeModals();
  };

  const closeModals = () => {
    setShowAddEmployeeModal(false);
    setShowEditEmployeeModal(false);
    setShowScheduleModal(false);
    setShowDeleteConfirm(false);
    setSelectedEmployee(null);
  };

  const handleSaveEmployee = (formData) => {
    if (selectedEmployee) {
      alert(`Employee ${selectedEmployee.name} has been updated successfully!`);
    } else {
      alert('New employee has been added successfully!');
    }
    closeModals();
  };

  const handleSaveSchedule = (scheduleData) => {
    alert(`Schedule for ${selectedEmployee.name} has been updated successfully!`);
    closeModals();
  };

  return (
    <div className="employee-page">
      <div className="employee-header">
        <div className="header-left">
          <h1>Employee Management</h1>
          <p className="page-subtitle">Manage staff, roles, and performance</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline">
            <Settings size={16} />
            Settings
          </button>
          <button className="btn btn-primary" onClick={handleAddEmployee}>
            <Plus size={16} />
            Add Employee
          </button>
        </div>
      </div>

      <div className="employee-stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              <stat.icon size={20} />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
              <span className="stat-change">+{stat.change} this month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="employee-controls">
        <div className="search-filter">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filter-controls">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="filter-select"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept === 'all' ? 'All Departments' : dept}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="view-toggle">
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>
      </div>

      <div className={`employee-content ${viewMode}`}>
        {viewMode === 'grid' ? (
          <div className="employee-grid">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="employee-card">
                <div className="card-header">
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="employee-avatar"
                  />
                  {getStatusBadge(employee.status)}
                </div>
                
                <div className="card-content">
                  <h3 className="employee-name">{employee.name}</h3>
                  <p className="employee-role">{employee.role}</p>
                  <p className="employee-department">{employee.department}</p>
                  
                  <div className="employee-rating">
                    {renderStarRating(employee.rating)}
                  </div>
                  
                  <div className="employee-stats">
                    <div className="stat-item">
                      <Users size={14} />
                      <span>{employee.patients} patients</span>
                    </div>
                    <div className="stat-item">
                      <Award size={14} />
                      <span>{employee.experience}</span>
                    </div>
                  </div>
                  
                  <div className="contact-info">
                    <div className="contact-item">
                      <Mail size={14} />
                      <span>{employee.email}</span>
                    </div>
                    <div className="contact-item">
                      <Phone size={14} />
                      <span>{employee.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div className="card-actions">
                  <button className="btn btn-sm btn-outline" onClick={() => handleEditEmployee(employee)}>
                    <Edit size={14} />
                    Edit
                  </button>
                  <button className="btn btn-sm btn-outline" onClick={() => handleScheduleEmployee(employee)}>
                    <Calendar size={14} />
                    Schedule
                  </button>
                  <button className="btn btn-sm btn-ghost" onClick={() => handleDeleteEmployee(employee)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="employee-list">
            <div className="list-header">
              <div className="list-row">
                <div className="list-cell">Employee</div>
                <div className="list-cell">Role</div>
                <div className="list-cell">Department</div>
                <div className="list-cell">Status</div>
                <div className="list-cell">Rating</div>
                <div className="list-cell">Patients</div>
                <div className="list-cell">Actions</div>
              </div>
            </div>
            <div className="list-body">
              {filteredEmployees.map((employee) => (
                <div key={employee.id} className="list-row">
                  <div className="list-cell">
                    <div className="employee-info">
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="employee-avatar-sm"
                      />
                      <div>
                        <p className="employee-name-sm">{employee.name}</p>
                        <p className="employee-email">{employee.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="list-cell">
                    <span className="employee-role-sm">{employee.role}</span>
                  </div>
                  <div className="list-cell">
                    <span className="employee-department-sm">{employee.department}</span>
                  </div>
                  <div className="list-cell">
                    {getStatusBadge(employee.status)}
                  </div>
                  <div className="list-cell">
                    {renderStarRating(employee.rating)}
                  </div>
                  <div className="list-cell">
                    <span className="patient-count">{employee.patients}</span>
                  </div>
                  <div className="list-cell">
                    <div className="action-buttons">
                      <button className="btn btn-sm btn-ghost" onClick={() => handleEditEmployee(employee)}>
                        <Edit size={14} />
                      </button>
                      <button className="btn btn-sm btn-ghost" onClick={() => handleScheduleEmployee(employee)}>
                        <Calendar size={14} />
                      </button>
                      <button className="btn btn-sm btn-ghost" onClick={() => handleDeleteEmployee(employee)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Employee Modal */}
      {showAddEmployeeModal && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Employee</h2>
              <button className="close-btn" onClick={closeModals}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <form className="employee-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="Enter full name" />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <select>
                      <option value="">Select Role</option>
                      <option value="doctor">Doctor</option>
                      <option value="nurse">Nurse</option>
                      <option value="receptionist">Receptionist</option>
                      <option value="lab-technician">Lab Technician</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Department</label>
                    <select>
                      <option value="">Select Department</option>
                      <option value="cardiology">Cardiology</option>
                      <option value="emergency">Emergency</option>
                      <option value="pediatrics">Pediatrics</option>
                      <option value="laboratory">Laboratory</option>
                      <option value="administration">Administration</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select>
                      <option value="active">Active</option>
                      <option value="on-leave">On Leave</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter email address" />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" placeholder="Enter phone number" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" placeholder="Enter address" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Join Date</label>
                    <input type="date" />
                  </div>
                  <div className="form-group">
                    <label>Salary</label>
                    <input type="text" placeholder="$0.00" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Experience</label>
                    <input type="text" placeholder="e.g., 5 years" />
                  </div>
                  <div className="form-group">
                    <label>Specialization</label>
                    <input type="text" placeholder="Enter specialization" />
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-outline" onClick={closeModals}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" onClick={(e) => { e.preventDefault(); handleSaveEmployee(); }}>
                    <Save size={16} />
                    Add Employee
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {showEditEmployeeModal && selectedEmployee && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Employee</h2>
              <button className="close-btn" onClick={closeModals}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <form className="employee-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue={selectedEmployee.name} />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <select defaultValue={selectedEmployee.role.toLowerCase()}>
                      <option value="doctor">Doctor</option>
                      <option value="senior doctor">Senior Doctor</option>
                      <option value="nurse">Nurse</option>
                      <option value="receptionist">Receptionist</option>
                      <option value="lab technician">Lab Technician</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Department</label>
                    <select defaultValue={selectedEmployee.department.toLowerCase()}>
                      <option value="cardiology">Cardiology</option>
                      <option value="emergency">Emergency</option>
                      <option value="pediatrics">Pediatrics</option>
                      <option value="laboratory">Laboratory</option>
                      <option value="administration">Administration</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select defaultValue={selectedEmployee.status}>
                      <option value="active">Active</option>
                      <option value="on-leave">On Leave</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" defaultValue={selectedEmployee.email} />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" defaultValue={selectedEmployee.phone} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" defaultValue={selectedEmployee.address} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Join Date</label>
                    <input type="date" defaultValue={selectedEmployee.joinDate} />
                  </div>
                  <div className="form-group">
                    <label>Salary</label>
                    <input type="text" defaultValue={selectedEmployee.salary} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Experience</label>
                    <input type="text" defaultValue={selectedEmployee.experience} />
                  </div>
                  <div className="form-group">
                    <label>Specialization</label>
                    <input type="text" defaultValue={selectedEmployee.specialization} />
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-outline" onClick={closeModals}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" onClick={(e) => { e.preventDefault(); handleSaveEmployee(); }}>
                    <Save size={16} />
                    Update Employee
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && selectedEmployee && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Manage Schedule - {selectedEmployee.name}</h2>
              <button className="close-btn" onClick={closeModals}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="current-schedule">
                <h4>Current Schedule</h4>
                <p>{selectedEmployee.schedule}</p>
              </div>
              <form className="schedule-form">
                <div className="form-group">
                  <label>Schedule Type</label>
                  <select>
                    <option value="fixed">Fixed Schedule</option>
                    <option value="rotating">Rotating Shifts</option>
                    <option value="on-call">On-Call</option>
                    <option value="part-time">Part-Time</option>
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Time</label>
                    <input type="time" defaultValue="09:00" />
                  </div>
                  <div className="form-group">
                    <label>End Time</label>
                    <input type="time" defaultValue="17:00" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Working Days</label>
                  <div className="checkbox-group">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                      <label key={day} className="checkbox-label">
                        <input type="checkbox" defaultChecked={day !== 'Saturday' && day !== 'Sunday'} />
                        <span>{day}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea placeholder="Additional schedule notes..."></textarea>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-outline" onClick={closeModals}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" onClick={(e) => { e.preventDefault(); handleSaveSchedule(); }}>
                    <Calendar size={16} />
                    Update Schedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedEmployee && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Delete Employee</h2>
              <button className="close-btn" onClick={closeModals}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>{selectedEmployee.name}</strong>?</p>
              <p>This action cannot be undone and will remove all associated data.</p>
              <div className="modal-actions">
                <button className="btn btn-outline" onClick={closeModals}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmDeleteEmployee}>
                  <Trash2 size={16} />
                  Delete Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePage;