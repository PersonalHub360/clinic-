import React, { useState, useEffect } from 'react';
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
  Save,
  Grid,
  List,
  Download,
  Upload,
  FileText,
  MoreVertical,
  Eye,
  DollarSign,
  Briefcase,
  GraduationCap,
  Shield,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  SortAsc,
  SortDesc,
  ChevronDown,
  Building,
  UserPlus,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Target,
  BarChart3,
  PieChart,
  TrendingDown
} from 'lucide-react';
import './EmployeePage.css';

const EmployeePage = () => {
  // Enhanced state management
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Modal states
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showEditEmployeeModal, setShowEditEmployeeModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  
  // Form data states
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    employeeId: '',
    role: '',
    department: '',
    email: '',
    phone: '',
    status: 'active',
    salary: '',
    joinDate: ''
  });
  
  const [scheduleData, setScheduleData] = useState({
    date: '',
    shift: '',
    startTime: '',
    endTime: '',
    notes: ''
  });

  // Enhanced employee data with more comprehensive information
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
      salary: 120000,
      rating: 4.8,
      patients: 156,
      experience: '8 years',
      schedule: 'Mon-Fri 9AM-5PM',
      specialization: 'Interventional Cardiology',
      education: 'MD, Harvard Medical School',
      certifications: ['Board Certified Cardiologist', 'Advanced Cardiac Life Support'],
      emergencyContact: 'John Wilson - +1 (555) 123-4568',
      performance: 95,
      lastLogin: '2024-01-15 09:30',
      workload: 85,
      availability: 'Available',
      shift: 'Day Shift',
      employeeId: 'EMP001'
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
      salary: 65000,
      rating: 4.6,
      patients: 89,
      experience: '5 years',
      schedule: 'Rotating Shifts',
      specialization: 'Emergency Care',
      education: 'BSN, State University',
      certifications: ['RN License', 'BLS', 'ACLS'],
      emergencyContact: 'Lisa Chen - +1 (555) 987-6544',
      performance: 88,
      lastLogin: '2024-01-15 07:15',
      workload: 92,
      availability: 'On Duty',
      shift: 'Night Shift',
      employeeId: 'EMP002'
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
      salary: 45000,
      rating: 4.9,
      patients: 0,
      experience: '3 years',
      schedule: 'Mon-Fri 8AM-4PM',
      specialization: 'Patient Relations',
      education: 'BA, Communications',
      certifications: ['Customer Service Excellence', 'Medical Terminology'],
      emergencyContact: 'Carlos Rodriguez - +1 (555) 456-7891',
      performance: 96,
      lastLogin: '2024-01-15 08:00',
      workload: 75,
      availability: 'Available',
      shift: 'Day Shift',
      employeeId: 'EMP003'
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
      salary: 110000,
      rating: 4.7,
      patients: 134,
      experience: '10 years',
      schedule: 'Mon-Thu 10AM-6PM',
      specialization: 'Child Development',
      education: 'MD, Johns Hopkins',
      certifications: ['Board Certified Pediatrician', 'PALS'],
      emergencyContact: 'Susan Kim - +1 (555) 321-0988',
      performance: 91,
      lastLogin: '2024-01-10 16:30',
      workload: 0,
      availability: 'On Leave',
      shift: 'Day Shift',
      employeeId: 'EMP004'
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
      salary: 55000,
      rating: 4.5,
      patients: 0,
      experience: '4 years',
      schedule: 'Mon-Fri 7AM-3PM',
      specialization: 'Clinical Diagnostics',
      education: 'BS, Medical Technology',
      certifications: ['MLT License', 'Phlebotomy Certification'],
      emergencyContact: 'Mark Thompson - +1 (555) 654-3211',
      performance: 87,
      lastLogin: '2024-01-15 06:45',
      workload: 78,
      availability: 'Available',
      shift: 'Morning Shift',
      employeeId: 'EMP005'
    },
    {
      id: 6,
      name: 'Dr. Amanda Foster',
      role: 'Senior Doctor',
      department: 'Neurology',
      avatar: 'https://images.unsplash.com/photo-1594824388853-d0c2d4e5b5e5?w=80&h=80&fit=crop&crop=face',
      email: 'amanda.foster@clinic.com',
      phone: '+1 (555) 789-0123',
      address: '987 Neuro Ave, City',
      status: 'active',
      joinDate: '2018-05-20',
      salary: 135000,
      rating: 4.9,
      patients: 178,
      experience: '12 years',
      schedule: 'Tue-Sat 10AM-6PM',
      specialization: 'Neurological Surgery',
      education: 'MD, PhD, Stanford Medical',
      certifications: ['Board Certified Neurologist', 'Neurosurgery Fellowship'],
      emergencyContact: 'David Foster - +1 (555) 789-0124',
      performance: 98,
      lastLogin: '2024-01-15 10:15',
      workload: 95,
      availability: 'In Surgery',
      shift: 'Day Shift',
      employeeId: 'EMP006'
    },
    {
      id: 7,
      name: 'James Wilson',
      role: 'Pharmacist',
      department: 'Pharmacy',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face',
      email: 'james.wilson@clinic.com',
      phone: '+1 (555) 234-5678',
      address: '234 Pharmacy St, City',
      status: 'active',
      joinDate: '2020-11-08',
      salary: 85000,
      rating: 4.6,
      patients: 0,
      experience: '6 years',
      schedule: 'Mon-Fri 9AM-5PM',
      specialization: 'Clinical Pharmacy',
      education: 'PharmD, University of Pharmacy',
      certifications: ['Licensed Pharmacist', 'Immunization Certified'],
      emergencyContact: 'Mary Wilson - +1 (555) 234-5679',
      performance: 89,
      lastLogin: '2024-01-15 09:00',
      workload: 82,
      availability: 'Available',
      shift: 'Day Shift',
      employeeId: 'EMP007'
    },
    {
      id: 8,
      name: 'Rachel Green',
      role: 'Physical Therapist',
      department: 'Rehabilitation',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face',
      email: 'rachel.green@clinic.com',
      phone: '+1 (555) 345-6789',
      address: '345 Rehab Road, City',
      status: 'active',
      joinDate: '2021-03-22',
      salary: 70000,
      rating: 4.7,
      patients: 67,
      experience: '5 years',
      schedule: 'Mon-Fri 8AM-4PM',
      specialization: 'Orthopedic Rehabilitation',
      education: 'DPT, Physical Therapy School',
      certifications: ['Licensed Physical Therapist', 'Orthopedic Specialist'],
      emergencyContact: 'Ross Green - +1 (555) 345-6790',
      performance: 92,
      lastLogin: '2024-01-15 07:30',
      workload: 88,
      availability: 'With Patient',
      shift: 'Day Shift',
      employeeId: 'EMP008'
    }
  ];

  // Enhanced statistics with more metrics
  const recentActivity = [
    {
      id: 1,
      type: 'new_hire',
      employee: 'Dr. Amanda Foster',
      action: 'New employee onboarded',
      time: '2 hours ago',
      icon: UserPlus
    },
    {
      id: 2,
      type: 'schedule_update',
      employee: 'Michael Chen',
      action: 'Schedule updated for next week',
      time: '4 hours ago',
      icon: CalendarIcon
    },
    {
      id: 3,
      type: 'performance_review',
      employee: 'Emily Rodriguez',
      action: 'Performance review completed',
      time: '1 day ago',
      icon: Target
    },
    {
      id: 4,
      type: 'leave_request',
      employee: 'Dr. Robert Kim',
      action: 'Leave request approved',
      time: '2 days ago',
      icon: ClockIcon
    }
  ];

  const departments = ['all', 'Cardiology', 'Emergency', 'Administration', 'Pediatrics', 'Laboratory', 'Neurology', 'Pharmacy', 'Rehabilitation'];
  const roles = ['all', 'Doctor', 'Senior Doctor', 'Nurse', 'Receptionist', 'Lab Technician', 'Pharmacist', 'Physical Therapist'];
  const statuses = ['all', 'active', 'on-leave', 'inactive'];

  // Calculate enhanced statistics
  const getEmployeeStats = () => {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(emp => emp.status === 'active').length;
    const onLeaveEmployees = employees.filter(emp => emp.status === 'on-leave').length;
    const avgRating = (employees.reduce((sum, emp) => sum + emp.rating, 0) / totalEmployees).toFixed(1);
    const avgPerformance = Math.round(employees.reduce((sum, emp) => sum + emp.performance, 0) / totalEmployees);
    const avgSalary = Math.round(employees.reduce((sum, emp) => sum + emp.salary, 0) / totalEmployees);
    const totalPatients = employees.reduce((sum, emp) => sum + emp.patients, 0);
    const avgWorkload = Math.round(employees.reduce((sum, emp) => sum + emp.workload, 0) / totalEmployees);

    return {
      totalEmployees,
      activeEmployees,
      onLeaveEmployees,
      avgRating,
      avgPerformance,
      avgSalary,
      totalPatients,
      avgWorkload
    };
  };

  const stats = getEmployeeStats();

  const statsCards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      change: '+2 this month',
      icon: Users,
      color: '#3b82f6',
      trend: 'up'
    },
    {
      title: 'Active Staff',
      value: stats.activeEmployees,
      change: '+1 this week',
      icon: UserCheck,
      color: '#10b981',
      trend: 'up'
    },
    {
      title: 'On Leave',
      value: stats.onLeaveEmployees,
      change: 'No change',
      icon: UserX,
      color: '#f59e0b',
      trend: 'neutral'
    },
    {
      title: 'Avg Performance',
      value: `${stats.avgPerformance}%`,
      change: '+3% this month',
      icon: TrendingUp,
      color: '#8b5cf6',
      trend: 'up'
    },
    {
      title: 'Avg Rating',
      value: stats.avgRating,
      change: '+0.2 this month',
      icon: Star,
      color: '#f59e0b',
      trend: 'up'
    },
    {
      title: 'Total Patients',
      value: stats.totalPatients,
      change: '+15 this week',
      icon: Activity,
      color: '#ef4444',
      trend: 'up'
    }
  ];

  // Advanced filtering and sorting
  const getFilteredEmployees = () => {
    let filtered = employees.filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
      const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
      const matchesRole = roleFilter === 'all' || employee.role === roleFilter;
      
      return matchesSearch && matchesDepartment && matchesStatus && matchesRole;
    });

    // Sort employees
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const filteredEmployees = getFilteredEmployees();

  // Event handlers
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map(emp => emp.id));
    }
  };

  const handleSelectEmployee = (employeeId) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for employees:`, selectedEmployees);
    setSelectedEmployees([]);
    setShowBulkActions(false);
  };

  const handleExportEmployees = () => {
    const csvContent = [
      ['ID', 'Name', 'Role', 'Department', 'Email', 'Phone', 'Status', 'Join Date', 'Salary', 'Rating', 'Performance'].join(','),
      ...filteredEmployees.map(emp => [
        emp.employeeId,
        emp.name,
        emp.role,
        emp.department,
        emp.email,
        emp.phone,
        emp.status,
        emp.joinDate,
        emp.salary,
        emp.rating,
        emp.performance
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employees.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePrintEmployees = () => {
    window.print();
  };

  // Utility functions
  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: '#10b981', bg: '#d1fae5', text: 'Active' },
      'on-leave': { color: '#f59e0b', bg: '#fef3c7', text: 'On Leave' },
      inactive: { color: '#ef4444', bg: '#fee2e2', text: 'Inactive' }
    };
    
    const config = statusConfig[status] || statusConfig.inactive;
    
    return (
      <span 
        className="status-badge"
        style={{ 
          color: config.color, 
          backgroundColor: config.bg,
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '500'
        }}
      >
        {config.text}
      </span>
    );
  };

  const getAvailabilityBadge = (availability) => {
    const availabilityConfig = {
      'Available': { color: '#10b981', bg: '#d1fae5' },
      'On Duty': { color: '#3b82f6', bg: '#dbeafe' },
      'In Surgery': { color: '#8b5cf6', bg: '#ede9fe' },
      'With Patient': { color: '#f59e0b', bg: '#fef3c7' },
      'On Leave': { color: '#ef4444', bg: '#fee2e2' }
    };
    
    const config = availabilityConfig[availability] || availabilityConfig['Available'];
    
    return (
      <span 
        className="availability-badge"
        style={{ 
          color: config.color, 
          backgroundColor: config.bg,
          padding: '2px 6px',
          borderRadius: '8px',
          fontSize: '11px',
          fontWeight: '500'
        }}
      >
        {availability}
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
            fill={star <= rating ? '#fbbf24' : 'none'}
            color="#fbbf24"
          />
        ))}
        <span className="rating-text">({rating})</span>
      </div>
    );
  };

  const renderStars = (rating) => {
    return renderStarRating(rating);
  };

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return '#10b981';
    if (performance >= 80) return '#f59e0b';
    if (performance >= 70) return '#ef4444';
    return '#6b7280';
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Employee management functions
  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setShowAddEmployeeModal(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowEditEmployeeModal(true);
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeDetails(true);
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
          <button className="btn btn-outline" onClick={handleRefresh}>
            <RefreshCw size={16} className={isLoading ? 'spinning' : ''} />
            Refresh
          </button>
          <button className="btn btn-outline" onClick={handleExportEmployees}>
            <Download size={16} />
            Export
          </button>
          <button className="btn btn-outline" onClick={handlePrintEmployees}>
            <FileText size={16} />
            Print
          </button>
          <button className="btn btn-primary" onClick={handleAddEmployee}>
            <Plus size={16} />
            Add Employee
          </button>
        </div>
      </div>

      <div className="employee-stats">
        {statsCards.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              <stat.icon size={20} />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
              <span className={`stat-change ${stat.trend}`}>
                {stat.trend === 'up' && <TrendingUp size={12} />}
                {stat.trend === 'down' && <TrendingDown size={12} />}
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="employee-controls">
        <div className="controls-left">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search employees by name, role, department, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <button 
            className={`btn btn-outline ${showAdvancedFilters ? 'active' : ''}`}
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            <Filter size={16} />
            Filters
            <ChevronDown size={14} className={showAdvancedFilters ? 'rotated' : ''} />
          </button>
        </div>

        <div className="controls-right">
          {selectedEmployees.length > 0 && (
            <div className="bulk-actions">
              <span className="selected-count">{selectedEmployees.length} selected</span>
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => setShowBulkActions(!showBulkActions)}
              >
                <MoreVertical size={14} />
                Actions
              </button>
              {showBulkActions && (
                <div className="bulk-actions-dropdown">
                  <button onClick={() => handleBulkAction('export')}>
                    <Download size={14} />
                    Export Selected
                  </button>
                  <button onClick={() => handleBulkAction('schedule')}>
                    <CalendarIcon size={14} />
                    Bulk Schedule
                  </button>
                  <button onClick={() => handleBulkAction('deactivate')}>
                    <UserX size={14} />
                    Deactivate
                  </button>
                  <button onClick={() => handleBulkAction('delete')} className="danger">
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="sort-controls">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Sort by Name</option>
              <option value="role">Sort by Role</option>
              <option value="department">Sort by Department</option>
              <option value="joinDate">Sort by Join Date</option>
              <option value="rating">Sort by Rating</option>
              <option value="performance">Sort by Performance</option>
              <option value="salary">Sort by Salary</option>
            </select>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />}
            </button>
          </div>

          <div className="view-toggle">
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

      {showAdvancedFilters && (
        <div className="advanced-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label>Department</label>
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
            </div>

            <div className="filter-group">
              <label>Role</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="filter-select"
              >
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role === 'all' ? 'All Roles' : role}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Status</label>
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

            <div className="filter-actions">
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setSearchTerm('');
                  setDepartmentFilter('all');
                  setRoleFilter('all');
                  setStatusFilter('all');
                  setSortBy('name');
                  setSortOrder('asc');
                }}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="employee-layout">
        <div className="employee-main">
          <div className="employees-header">
            <div className="results-info">
              <span className="results-count">
                Showing {filteredEmployees.length} of {employees.length} employees
              </span>
              {selectedEmployees.length > 0 && (
                <button 
                  className="btn btn-link btn-sm"
                  onClick={handleSelectAll}
                >
                  {selectedEmployees.length === filteredEmployees.length ? 'Deselect All' : 'Select All'}
                </button>
              )}
            </div>
          </div>

          <div className={`employee-content ${viewMode}`}>
            {viewMode === 'grid' ? (
              <div className="employee-grid">
                {filteredEmployees.map((employee) => (
                  <div key={employee.id} className="employee-card">
                    <div className="card-header">
                      <div className="card-select">
                        <input
                          type="checkbox"
                          checked={selectedEmployees.includes(employee.id)}
                          onChange={() => handleSelectEmployee(employee.id)}
                        />
                      </div>
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="employee-avatar"
                      />
                      <div className="card-badges">
                        {getStatusBadge(employee.status)}
                        {getAvailabilityBadge(employee.availability)}
                      </div>
                    </div>
                    
                    <div className="card-content">
                      <h3 className="employee-name">{employee.name}</h3>
                      <p className="employee-id">ID: {employee.employeeId}</p>
                      <p className="employee-role">{employee.role}</p>
                      <p className="employee-department">
                        <Building size={12} />
                        {employee.department}
                      </p>
                      
                      <div className="employee-rating">
                        {renderStars(employee.rating)}
                      </div>
                      
                      <div className="employee-metrics">
                        <div className="metric-item">
                          <Users size={12} />
                          <span>{employee.patients} patients</span>
                        </div>
                        <div className="metric-item">
                          <Award size={12} />
                          <span>{employee.experience}</span>
                        </div>
                        <div className="metric-item">
                          <Target size={12} />
                          <span style={{ color: getPerformanceColor(employee.performance) }}>
                            {employee.performance}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="contact-info">
                        <div className="contact-item">
                          <Mail size={12} />
                          <span>{employee.email}</span>
                        </div>
                        <div className="contact-item">
                          <Phone size={12} />
                          <span>{employee.phone}</span>
                        </div>
                        <div className="contact-item">
                          <DollarSign size={12} />
                          <span>{formatSalary(employee.salary)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card-actions">
                      <button 
                        className="btn btn-sm btn-outline" 
                        onClick={() => handleViewEmployee(employee)}
                      >
                        <Eye size={14} />
                        View
                      </button>
                      <button 
                        className="btn btn-sm btn-outline" 
                        onClick={() => handleEditEmployee(employee)}
                      >
                        <Edit size={14} />
                        Edit
                      </button>
                      <button className="btn btn-sm btn-outline" onClick={() => handleScheduleEmployee(employee)}>
                        <Calendar size={14} />
                        Schedule
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteEmployee(employee)}>
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
         ) : (
           <div className="employee-list">
             {filteredEmployees.map((employee) => (
               <div key={employee.id} className="employee-row">
                 <div className="employee-info">
                   <img
                     src={employee.avatar}
                     alt={employee.name}
                     className="employee-avatar-sm"
                   />
                   <div>
                     <div className="employee-name">{employee.name}</div>
                     <div className="employee-role">{employee.role}</div>
                   </div>
                 </div>
                 
                 <div className="employee-department">{employee.department}</div>
                 
                 <div className="employee-contact">
                   <div>{employee.email}</div>
                   <div>{employee.phone}</div>
                 </div>
                 
                 <div className="employee-rating">
                   {renderStarRating(employee.rating)}
                 </div>
                 
                 <div className="employee-status">
                   {getStatusBadge(employee.status)}
                 </div>
                 
                 <div className="employee-actions">
                   <button className="btn btn-sm btn-ghost" onClick={() => handleEditEmployee(employee)}>
                     <Edit size={14} />
                   </button>
                   <button className="btn btn-sm btn-ghost" onClick={() => handleScheduleEmployee(employee)}>
                     <Calendar size={14} />
                   </button>
                   <button className="btn btn-sm btn-ghost text-danger" onClick={() => handleDeleteEmployee(employee)}>
                     <Trash2 size={14} />
                   </button>
                 </div>
               </div>
             ))}
           </div>
         )}
       </div>
     </div>
   </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Employee</h2>
              <button className="modal-close" onClick={closeModals}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <form onSubmit={handleSaveEmployee}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Employee ID</label>
                    <input
                      type="text"
                      value={newEmployee.employeeId}
                      onChange={(e) => setNewEmployee({...newEmployee, employeeId: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Role</label>
                    <select
                      value={newEmployee.role}
                      onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})}
                      required
                    >
                      <option value="">Select Role</option>
                      {roles.filter(role => role !== 'all').map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <select
                      value={newEmployee.department}
                      onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.filter(dept => dept !== 'all').map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Salary</label>
                    <input
                      type="number"
                      value={newEmployee.salary}
                      onChange={(e) => setNewEmployee({...newEmployee, salary: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Join Date</label>
                    <input
                      type="date"
                      value={newEmployee.joinDate}
                      onChange={(e) => setNewEmployee({...newEmployee, joinDate: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button type="button" className="btn btn-outline" onClick={closeModals}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
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
              <button className="modal-close" onClick={closeModals}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <form onSubmit={handleSaveEmployee}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={selectedEmployee.name}
                      onChange={(e) => setSelectedEmployee({...selectedEmployee, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Employee ID</label>
                    <input
                      type="text"
                      value={selectedEmployee.employeeId}
                      onChange={(e) => setSelectedEmployee({...selectedEmployee, employeeId: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Role</label>
                    <select
                      value={selectedEmployee.role}
                      onChange={(e) => setSelectedEmployee({...selectedEmployee, role: e.target.value})}
                      required
                    >
                      {roles.filter(role => role !== 'all').map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <select
                      value={selectedEmployee.department}
                      onChange={(e) => setSelectedEmployee({...selectedEmployee, department: e.target.value})}
                      required
                    >
                      {departments.filter(dept => dept !== 'all').map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={selectedEmployee.email}
                      onChange={(e) => setSelectedEmployee({...selectedEmployee, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={selectedEmployee.phone}
                      onChange={(e) => setSelectedEmployee({...selectedEmployee, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={selectedEmployee.status}
                      onChange={(e) => setSelectedEmployee({...selectedEmployee, status: e.target.value})}
                      required
                    >
                      {statuses.filter(status => status !== 'all').map(status => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Salary</label>
                    <input
                      type="number"
                      value={selectedEmployee.salary}
                      onChange={(e) => setSelectedEmployee({...selectedEmployee, salary: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button type="button" className="btn btn-outline" onClick={closeModals}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Employee Modal */}
      {showViewModal && selectedEmployee && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Employee Details</h2>
              <button className="modal-close" onClick={closeModals}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="employee-details">
                <div className="employee-profile">
                  <img
                    src={selectedEmployee.avatar}
                    alt={selectedEmployee.name}
                    className="employee-avatar-large"
                  />
                  <div className="profile-info">
                    <h3>{selectedEmployee.name}</h3>
                    <p className="employee-id">ID: {selectedEmployee.employeeId}</p>
                    <p className="employee-role">{selectedEmployee.role}</p>
                    <div className="status-badges">
                      {getStatusBadge(selectedEmployee.status)}
                      {getAvailabilityBadge(selectedEmployee.availability)}
                    </div>
                  </div>
                </div>
                
                <div className="details-grid">
                  <div className="detail-section">
                    <h4>Contact Information</h4>
                    <div className="detail-item">
                      <Mail size={16} />
                      <span>{selectedEmployee.email}</span>
                    </div>
                    <div className="detail-item">
                      <Phone size={16} />
                      <span>{selectedEmployee.phone}</span>
                    </div>
                    <div className="detail-item">
                      <MapPin size={16} />
                      <span>{selectedEmployee.address}</span>
                    </div>
                  </div>
                  
                  <div className="detail-section">
                    <h4>Employment Details</h4>
                    <div className="detail-item">
                      <Building size={16} />
                      <span>{selectedEmployee.department}</span>
                    </div>
                    <div className="detail-item">
                      <Briefcase size={16} />
                      <span>{selectedEmployee.role}</span>
                    </div>
                    <div className="detail-item">
                      <CalendarIcon size={16} />
                      <span>Joined {formatDate(selectedEmployee.joinDate)}</span>
                    </div>
                    <div className="detail-item">
                      <DollarSign size={16} />
                      <span>{formatSalary(selectedEmployee.salary)}</span>
                    </div>
                  </div>
                  
                  <div className="detail-section">
                    <h4>Performance Metrics</h4>
                    <div className="detail-item">
                      <Star size={16} />
                      <span>Rating: {selectedEmployee.rating}/5</span>
                    </div>
                    <div className="detail-item">
                      <Target size={16} />
                      <span>Performance: {selectedEmployee.performance}%</span>
                    </div>
                    <div className="detail-item">
                      <Users size={16} />
                      <span>{selectedEmployee.patients} patients</span>
                    </div>
                    <div className="detail-item">
                      <Award size={16} />
                      <span>{selectedEmployee.experience}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Employee Modal */}
      {showScheduleModal && selectedEmployee && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Schedule Employee</h2>
              <button className="modal-close" onClick={closeModals}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <form onSubmit={handleSaveSchedule}>
                <div className="form-group">
                  <label>Employee</label>
                  <input
                    type="text"
                    value={selectedEmployee.name}
                    disabled
                    className="form-input disabled"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={scheduleData.date}
                      onChange={(e) => setScheduleData({...scheduleData, date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Shift Type</label>
                    <select
                      value={scheduleData.shift}
                      onChange={(e) => setScheduleData({...scheduleData, shift: e.target.value})}
                      required
                    >
                      <option value="">Select Shift</option>
                      <option value="morning">Morning (8:00 AM - 4:00 PM)</option>
                      <option value="afternoon">Afternoon (12:00 PM - 8:00 PM)</option>
                      <option value="night">Night (8:00 PM - 8:00 AM)</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Time</label>
                    <input
                      type="time"
                      value={scheduleData.startTime}
                      onChange={(e) => setScheduleData({...scheduleData, startTime: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>End Time</label>
                    <input
                      type="time"
                      value={scheduleData.endTime}
                      onChange={(e) => setScheduleData({...scheduleData, endTime: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    value={scheduleData.notes}
                    onChange={(e) => setScheduleData({...scheduleData, notes: e.target.value})}
                    placeholder="Additional notes or instructions..."
                    rows="3"
                  />
                </div>
                
                <div className="modal-actions">
                  <button type="button" className="btn btn-outline" onClick={closeModals}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Schedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedEmployee && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button className="modal-close" onClick={closeModals}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="delete-confirmation">
                <div className="warning-icon">
                  <AlertTriangle size={48} color="#f59e0b" />
                </div>
                <p>Are you sure you want to delete <strong>{selectedEmployee.name}</strong>?</p>
                <p className="warning-text">This action cannot be undone.</p>
              </div>
              
              <div className="modal-actions">
                <button className="btn btn-outline" onClick={closeModals}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmDeleteEmployee}>
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