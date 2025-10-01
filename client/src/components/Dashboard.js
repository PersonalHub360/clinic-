import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar as CalendarIcon, 
  DollarSign, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Heart, 
  Stethoscope,
  UserPlus,
  CalendarPlus,
  Receipt,
  FileText,
  Bell,
  Settings,
  Download,
  Printer,
  RefreshCw,
  BarChart3,
  PieChart,
  Eye,
  Filter,
  Search
} from 'lucide-react';
import StatsCards from './StatsCards';
import PatientChart from './PatientChart';
import BalanceCard from './BalanceCard';
import RoomOccupancy from './RoomOccupancy';
import Calendar from './Calendar';
import Reports from './Reports';
import WelcomeMessage from './WelcomeMessage';
import './Dashboard.css';

const Dashboard = ({ data }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [quickStats, setQuickStats] = useState({});

  // Enhanced dashboard data with real-time updates
  const [dashboardData, setDashboardData] = useState({
    todayStats: {
      totalPatients: 45,
      newPatients: 8,
      appointments: 32,
      completedAppointments: 28,
      pendingAppointments: 4,
      revenue: 12450,
      expenses: 3200,
      netIncome: 9250
    },
    alerts: [
      { id: 1, type: 'urgent', message: '3 patients waiting for more than 30 minutes', time: '5 min ago' },
      { id: 2, type: 'info', message: 'Dr. Smith has 2 appointments rescheduled', time: '15 min ago' },
      { id: 3, type: 'warning', message: '5 bills are overdue for payment', time: '1 hour ago' }
    ],
    recentActivities: [
      { id: 1, action: 'New patient registered', patient: 'Sarah Johnson', time: '2 min ago', type: 'patient' },
      { id: 2, action: 'Payment received', amount: '$250', time: '5 min ago', type: 'payment' },
      { id: 3, action: 'Appointment completed', patient: 'Mike Chen', time: '10 min ago', type: 'appointment' },
      { id: 4, action: 'Bill generated', patient: 'Emily Davis', time: '15 min ago', type: 'bill' }
    ],
    upcomingAppointments: [
      { id: 1, patient: 'John Doe', time: '10:30 AM', doctor: 'Dr. Smith', type: 'Consultation' },
      { id: 2, patient: 'Jane Wilson', time: '11:00 AM', doctor: 'Dr. Johnson', type: 'Follow-up' },
      { id: 3, patient: 'Robert Brown', time: '11:30 AM', doctor: 'Dr. Davis', type: 'Check-up' }
    ],
    departmentStats: [
      { name: 'General Medicine', patients: 15, revenue: 4500, utilization: 85 },
      { name: 'Cardiology', patients: 8, revenue: 3200, utilization: 70 },
      { name: 'Pediatrics', patients: 12, revenue: 2800, utilization: 90 },
      { name: 'Orthopedics', patients: 10, revenue: 1950, utilization: 65 }
    ]
  });

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        todayStats: {
          ...prev.todayStats,
          totalPatients: prev.todayStats.totalPatients + Math.floor(Math.random() * 2),
          revenue: prev.todayStats.revenue + Math.floor(Math.random() * 100)
        }
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'urgent': return <AlertCircle className="alert-icon urgent" />;
      case 'warning': return <Clock className="alert-icon warning" />;
      case 'info': return <CheckCircle className="alert-icon info" />;
      default: return <Bell className="alert-icon" />;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'patient': return <UserPlus className="activity-icon patient" />;
      case 'payment': return <DollarSign className="activity-icon payment" />;
      case 'appointment': return <CalendarIcon className="activity-icon appointment" />;
      case 'bill': return <Receipt className="activity-icon bill" />;
      default: return <Activity className="activity-icon" />;
    }
  };

  if (!data && !dashboardData) {
    return <div className="dashboard-loading">Loading dashboard data...</div>;
  }

  return (
    <div className="dashboard">
      {/* Modern Enhanced Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <div className="welcome-section">
            <WelcomeMessage />
            <div className="live-indicator">
              <div className="pulse-dot"></div>
              <span>Live Data</span>
            </div>
          </div>
          <div className="time-range-selector">
            <Filter className="filter-icon" />
            <select 
              value={selectedTimeRange} 
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="time-range-select"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
        
        <div className="header-actions">
          <div className="search-container">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Quick search..." 
              className="quick-search"
            />
          </div>
          <button className="action-btn primary" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`icon ${refreshing ? 'spinning' : ''}`} />
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
          <button className="action-btn notification-btn">
            <Bell className="icon" />
            <span className="notification-badge">3</span>
          </button>
        </div>
      </div>

      {/* Enhanced Quick Stats Overview with Modern Cards */}
      <div className="quick-stats-grid">
        <div className="stat-card patients modern-card">
          <div className="stat-icon">
            <Users className="icon" />
          </div>
          <div className="stat-content">
            <div className="stat-header">
              <h3>{dashboardData.todayStats.totalPatients}</h3>
              <div className="stat-change positive">
                <TrendingUp className="trend-icon" />
                +12%
              </div>
            </div>
            <p>Total Patients</p>
            <div className="stat-details">
              <span className="detail-item">
                <UserPlus className="detail-icon" />
                {dashboardData.todayStats.newPatients} new today
              </span>
            </div>
          </div>
        </div>

        <div className="stat-card appointments modern-card">
          <div className="stat-icon">
            <CalendarIcon className="icon" />
          </div>
          <div className="stat-content">
            <div className="stat-header">
              <h3>{dashboardData.todayStats.appointments}</h3>
              <div className="stat-change positive">
                <TrendingUp className="trend-icon" />
                +8%
              </div>
            </div>
            <p>Appointments</p>
            <div className="stat-details">
              <span className="detail-item">
                <CheckCircle className="detail-icon" />
                {dashboardData.todayStats.completedAppointments} completed
              </span>
              <span className="detail-item">
                <Clock className="detail-icon" />
                {dashboardData.todayStats.pendingAppointments} pending
              </span>
            </div>
          </div>
        </div>

        <div className="stat-card revenue modern-card">
          <div className="stat-icon">
            <DollarSign className="icon" />
          </div>
          <div className="stat-content">
            <div className="stat-header">
              <h3>${dashboardData.todayStats.revenue.toLocaleString()}</h3>
              <div className="stat-change positive">
                <TrendingUp className="trend-icon" />
                +15%
              </div>
            </div>
            <p>Revenue Today</p>
            <div className="stat-details">
              <span className="detail-item">
                <Activity className="detail-icon" />
                Net: ${dashboardData.todayStats.netIncome.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="stat-card efficiency modern-card">
          <div className="stat-icon">
            <BarChart3 className="icon" />
          </div>
          <div className="stat-content">
            <div className="stat-header">
              <h3>94%</h3>
              <div className="stat-change positive">
                <TrendingUp className="trend-icon" />
                +3%
              </div>
            </div>
            <p>Efficiency Rate</p>
            <div className="stat-details">
              <span className="detail-item">
                <Heart className="detail-icon" />
                Patient satisfaction: 4.8/5
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Three-Column Layout */}
      <div className="dashboard-main-grid">
        {/* Left Column - Alerts & Activities */}
        <div className="dashboard-left">
          {/* Priority Alerts with Enhanced Design */}
          <div className="dashboard-card alerts-card modern-card">
            <div className="card-header">
              <div className="header-title">
                <AlertCircle className="header-icon" />
                <h3>Priority Alerts</h3>
              </div>
              <div className="alert-count">
                <span className="count-badge">{dashboardData.alerts.length}</span>
              </div>
            </div>
            <div className="alerts-list">
              {dashboardData.alerts.map(alert => (
                <div key={alert.id} className={`alert-item ${alert.type}`}>
                  {getAlertIcon(alert.type)}
                  <div className="alert-content">
                    <p>{alert.message}</p>
                    <span className="alert-time">{alert.time}</span>
                  </div>
                  <button className="alert-action">
                    <Eye className="action-icon" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities with Timeline Design */}
          <div className="dashboard-card activities-card modern-card">
            <div className="card-header">
              <div className="header-title">
                <Activity className="header-icon" />
                <h3>Recent Activities</h3>
              </div>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="activities-list timeline">
              {dashboardData.recentActivities.map(activity => (
                <div key={activity.id} className="activity-item timeline-item">
                  <div className="timeline-marker">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="activity-content">
                    <p>{activity.action}</p>
                    {activity.patient && <span className="activity-patient">{activity.patient}</span>}
                    {activity.amount && <span className="activity-amount">{activity.amount}</span>}
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Performance with Progress Bars */}
          <div className="dashboard-card departments-card modern-card">
            <div className="card-header">
              <div className="header-title">
                <Stethoscope className="header-icon" />
                <h3>Department Performance</h3>
              </div>
              <button className="view-all-btn">Details</button>
            </div>
            <div className="departments-list">
              {dashboardData.departmentStats.map((dept, index) => (
                <div key={index} className="department-item modern-dept">
                  <div className="dept-info">
                    <div className="dept-header">
                      <h4>{dept.name}</h4>
                      <span className="dept-score">{dept.utilization}%</span>
                    </div>
                    <div className="dept-stats">
                      <span className="stat-item">
                        <Users className="stat-icon" />
                        {dept.patients} patients
                      </span>
                      <span className="stat-item">
                        <DollarSign className="stat-icon" />
                        ${dept.revenue}
                      </span>
                    </div>
                  </div>
                  <div className="dept-utilization">
                    <div className="utilization-bar modern-bar">
                      <div 
                        className="utilization-fill" 
                        style={{ width: `${dept.utilization}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column */}
        <div className="dashboard-center">
          {data && <StatsCards stats={data.stats} />}
          {data && <PatientChart chartData={data.chartData} />}
          
          <div className="dashboard-row">
            {data && <BalanceCard balance={data.balance} />}
            {data && <RoomOccupancy occupancy={data.roomOccupancy} />}
          </div>
        </div>

        {/* Right Column - Quick Actions & Appointments */}
        <div className="dashboard-right">
          {/* Enhanced Quick Actions */}
          <div className="dashboard-card quick-actions-card modern-card">
            <div className="card-header">
              <div className="header-title">
                <Settings className="header-icon" />
                <h3>Quick Actions</h3>
              </div>
            </div>
            <div className="quick-actions-grid modern-actions">
              <button className="quick-action-btn primary-action">
                <UserPlus className="action-icon" />
                <span>Add Patient</span>
                <div className="action-badge">New</div>
              </button>
              <button className="quick-action-btn secondary-action">
                <CalendarPlus className="action-icon" />
                <span>Schedule</span>
              </button>
              <button className="quick-action-btn secondary-action">
                <Receipt className="action-icon" />
                <span>New Bill</span>
              </button>
              <button className="quick-action-btn secondary-action">
                <FileText className="action-icon" />
                <span>Report</span>
              </button>
              <button className="quick-action-btn tertiary-action">
                <PieChart className="action-icon" />
                <span>Analytics</span>
              </button>
              <button className="quick-action-btn tertiary-action">
                <Download className="action-icon" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Enhanced Upcoming Appointments */}
          <div className="dashboard-card upcoming-appointments-card modern-card">
            <div className="card-header">
              <div className="header-title">
                <CalendarIcon className="header-icon" />
                <h3>Upcoming Appointments</h3>
              </div>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="appointments-list modern-appointments">
              {dashboardData.upcomingAppointments.map(appointment => (
                <div key={appointment.id} className="appointment-item modern-appointment">
                  <div className="appointment-time-badge">
                    <Clock className="time-icon" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="appointment-details">
                    <h4>{appointment.patient}</h4>
                    <p>
                      <span className="doctor-name">{appointment.doctor}</span>
                      <span className="appointment-type">{appointment.type}</span>
                    </p>
                  </div>
                  <div className="appointment-actions">
                    <button className="appointment-action primary">
                      <Eye className="icon" />
                    </button>
                    <button className="appointment-action secondary">
                      <CalendarIcon className="icon" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="appointments-footer">
              <button className="add-appointment-btn">
                <CalendarPlus className="icon" />
                Schedule New Appointment
              </button>
            </div>
          </div>

          {/* Modern Calendar Widget */}
          {data && <Calendar appointments={data.appointments} />}
          
          {/* Enhanced Reports Widget */}
          {data && <Reports reports={data.reports} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;