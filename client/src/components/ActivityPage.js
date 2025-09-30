import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  UserPlus, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Info,
  Settings
} from 'lucide-react';
import './ActivityPage.css';

const ActivityPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');
  const [userFilter, setUserFilter] = useState('all');

  // Sample activity data
  const activities = [
    {
      id: 1,
      type: 'patient_added',
      title: 'New Patient Registration',
      description: 'Sarah Johnson was registered as a new patient',
      user: {
        name: 'Emily Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1594824388853-d0c2d4e5b5e5?w=40&h=40&fit=crop&crop=face',
        role: 'Receptionist'
      },
      timestamp: '2024-01-15T10:30:00Z',
      category: 'patient',
      severity: 'info',
      details: {
        patientId: 'P-001',
        patientName: 'Sarah Johnson',
        registrationMethod: 'Walk-in'
      }
    },
    {
      id: 2,
      type: 'appointment_scheduled',
      title: 'Appointment Scheduled',
      description: 'Appointment scheduled for Michael Chen with Dr. Wilson',
      user: {
        name: 'Dr. Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face',
        role: 'Doctor'
      },
      timestamp: '2024-01-15T09:45:00Z',
      category: 'appointment',
      severity: 'success',
      details: {
        appointmentId: 'A-001',
        patientName: 'Michael Chen',
        appointmentDate: '2024-01-20',
        appointmentTime: '14:00'
      }
    },
    {
      id: 3,
      type: 'payment_received',
      title: 'Payment Processed',
      description: 'Payment of $250.00 received from Emily Davis',
      user: {
        name: 'System',
        avatar: null,
        role: 'Automated'
      },
      timestamp: '2024-01-15T08:20:00Z',
      category: 'payment',
      severity: 'success',
      details: {
        invoiceId: 'INV-003',
        amount: 250.00,
        paymentMethod: 'Credit Card',
        transactionId: 'TXN-12345'
      }
    },
    {
      id: 4,
      type: 'user_login',
      title: 'User Login',
      description: 'Michael Chen logged into the system',
      user: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face',
        role: 'Nurse'
      },
      timestamp: '2024-01-15T07:00:00Z',
      category: 'system',
      severity: 'info',
      details: {
        ipAddress: '192.168.1.100',
        userAgent: 'Chrome/120.0.0.0',
        loginMethod: 'Password'
      }
    },
    {
      id: 5,
      type: 'record_updated',
      title: 'Patient Record Updated',
      description: 'Medical record updated for Robert Wilson',
      user: {
        name: 'Dr. Robert Kim',
        avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=40&h=40&fit=crop&crop=face',
        role: 'Doctor'
      },
      timestamp: '2024-01-14T16:30:00Z',
      category: 'medical',
      severity: 'warning',
      details: {
        patientId: 'P-004',
        patientName: 'Robert Wilson',
        updatedFields: ['diagnosis', 'treatment_plan'],
        recordType: 'Medical History'
      }
    },
    {
      id: 6,
      type: 'system_backup',
      title: 'System Backup Completed',
      description: 'Daily system backup completed successfully',
      user: {
        name: 'System',
        avatar: null,
        role: 'Automated'
      },
      timestamp: '2024-01-14T02:00:00Z',
      category: 'system',
      severity: 'success',
      details: {
        backupSize: '2.4 GB',
        backupLocation: 'Cloud Storage',
        duration: '45 minutes'
      }
    }
  ];

  const activityTypes = ['all', 'patient_added', 'appointment_scheduled', 'payment_received', 'user_login', 'record_updated', 'system_backup'];
  const dateFilters = ['today', 'yesterday', 'this_week', 'this_month'];
  const users = ['all', ...new Set(activities.map(a => a.user.name))];

  const stats = [
    {
      title: 'Total Activities',
      value: '156',
      change: '+12',
      icon: Activity,
      color: '#10b981'
    },
    {
      title: 'User Actions',
      value: '89',
      change: '+8',
      icon: User,
      color: '#3b82f6'
    },
    {
      title: 'System Events',
      value: '67',
      change: '+4',
      icon: Settings,
      color: '#8b5cf6'
    },
    {
      title: 'Errors',
      value: '2',
      change: '-1',
      icon: AlertCircle,
      color: '#ef4444'
    }
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.user.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || activity.type === typeFilter;
    const matchesUser = userFilter === 'all' || activity.user.name === userFilter;
    
    // Simple date filtering (in real app, you'd use proper date comparison)
    const matchesDate = dateFilter === 'today'; // Simplified for demo
    
    return matchesSearch && matchesType && matchesUser && matchesDate;
  });

  const getActivityIcon = (type) => {
    const iconMap = {
      patient_added: UserPlus,
      appointment_scheduled: Calendar,
      payment_received: CheckCircle,
      user_login: User,
      record_updated: Edit,
      system_backup: Download
    };
    
    const IconComponent = iconMap[type] || Activity;
    return <IconComponent size={16} />;
  };

  const getSeverityColor = (severity) => {
    const colorMap = {
      info: '#3b82f6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    };
    
    return colorMap[severity] || '#64748b';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="activity-page">
      <div className="activity-header">
        <div className="header-left">
          <h1>Activity Log</h1>
          <p className="page-subtitle">Monitor system activities and user actions</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline">
            <RefreshCw size={16} />
            Refresh
          </button>
          <button className="btn btn-outline">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="activity-stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              <stat.icon size={20} />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
              <span className="stat-change">{stat.change} today</span>
            </div>
          </div>
        ))}
      </div>

      <div className="activity-controls">
        <div className="search-filter">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filter-controls">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            {activityTypes.slice(1).map(type => (
              <option key={type} value={type}>
                {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="filter-select"
          >
            {dateFilters.map(filter => (
              <option key={filter} value={filter}>
                {filter.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>

          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Users</option>
            {users.slice(1).map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="activity-content">
        <div className="activity-timeline">
          <h3 className="timeline-title">Recent Activities</h3>
          <div className="timeline-list">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon" style={{ backgroundColor: `${getSeverityColor(activity.severity)}20`, color: getSeverityColor(activity.severity) }}>
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="activity-content-main">
                  <div className="activity-header">
                    <div className="activity-info">
                      <h4 className="activity-title">{activity.title}</h4>
                      <p className="activity-description">{activity.description}</p>
                    </div>
                    <div className="activity-meta">
                      <span className="activity-time">{formatTimestamp(activity.timestamp)}</span>
                      <span className={`activity-category ${activity.category}`}>
                        {activity.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="activity-user">
                    {activity.user.avatar ? (
                      <img
                        src={activity.user.avatar}
                        alt={activity.user.name}
                        className="user-avatar"
                      />
                    ) : (
                      <div className="system-avatar">
                        <Settings size={16} />
                      </div>
                    )}
                    <div className="user-info">
                      <span className="user-name">{activity.user.name}</span>
                      <span className="user-role">{activity.user.role}</span>
                    </div>
                  </div>
                  
                  {activity.details && (
                    <div className="activity-details">
                      <button className="details-toggle">
                        <Eye size={14} />
                        View Details
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="activity-sidebar">
          <div className="activity-summary">
            <h4>Activity Summary</h4>
            <div className="summary-chart">
              <div className="chart-item">
                <div className="chart-bar" style={{ height: '60%', backgroundColor: '#10b981' }}></div>
                <span className="chart-label">Patient</span>
              </div>
              <div className="chart-item">
                <div className="chart-bar" style={{ height: '80%', backgroundColor: '#3b82f6' }}></div>
                <span className="chart-label">Appointment</span>
              </div>
              <div className="chart-item">
                <div className="chart-bar" style={{ height: '40%', backgroundColor: '#8b5cf6' }}></div>
                <span className="chart-label">Payment</span>
              </div>
              <div className="chart-item">
                <div className="chart-bar" style={{ height: '30%', backgroundColor: '#f59e0b' }}></div>
                <span className="chart-label">System</span>
              </div>
            </div>
          </div>

          <div className="recent-users">
            <h4>Active Users</h4>
            <div className="users-list">
              {activities.slice(0, 5).map((activity, index) => (
                <div key={index} className="user-item">
                  {activity.user.avatar ? (
                    <img
                      src={activity.user.avatar}
                      alt={activity.user.name}
                      className="user-avatar-sm"
                    />
                  ) : (
                    <div className="system-avatar-sm">
                      <Settings size={12} />
                    </div>
                  )}
                  <div className="user-details">
                    <span className="user-name-sm">{activity.user.name}</span>
                    <span className="user-activity">{activity.type.replace(/_/g, ' ')}</span>
                  </div>
                  <span className="user-time">{formatTimestamp(activity.timestamp)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="quick-filters">
            <h4>Quick Filters</h4>
            <button className="filter-btn">
              <AlertCircle size={16} />
              Errors Only
            </button>
            <button className="filter-btn">
              <User size={16} />
              User Actions
            </button>
            <button className="filter-btn">
              <Settings size={16} />
              System Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;