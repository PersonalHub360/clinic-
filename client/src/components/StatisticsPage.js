import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  Activity, 
  Download, 
  Filter, 
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Eye,
  Clock,
  Heart,
  UserCheck,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import './StatisticsPage.css';

const StatisticsPage = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('patients');

  // Sample statistics data
  const overviewStats = [
    {
      title: 'Total Patients',
      value: '1,250',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: '#3b82f6',
      description: 'Active patients this month'
    },
    {
      title: 'Appointments',
      value: '856',
      change: '+8.2%',
      trend: 'up',
      icon: Calendar,
      color: '#10b981',
      description: 'Scheduled appointments'
    },
    {
      title: 'Revenue',
      value: '$45,280',
      change: '+15.3%',
      trend: 'up',
      icon: DollarSign,
      color: '#f59e0b',
      description: 'Monthly revenue'
    },
    {
      title: 'Satisfaction',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Heart,
      color: '#ef4444',
      description: 'Patient satisfaction rate'
    }
  ];

  const chartData = {
    patients: [
      { month: 'Jan', value: 1100 },
      { month: 'Feb', value: 1150 },
      { month: 'Mar', value: 1200 },
      { month: 'Apr', value: 1180 },
      { month: 'May', value: 1220 },
      { month: 'Jun', value: 1250 }
    ],
    appointments: [
      { month: 'Jan', value: 720 },
      { month: 'Feb', value: 780 },
      { month: 'Mar', value: 820 },
      { month: 'Apr', value: 800 },
      { month: 'May', value: 840 },
      { month: 'Jun', value: 856 }
    ],
    revenue: [
      { month: 'Jan', value: 38000 },
      { month: 'Feb', value: 41000 },
      { month: 'Mar', value: 43000 },
      { month: 'Apr', value: 42000 },
      { month: 'May', value: 44000 },
      { month: 'Jun', value: 45280 }
    ]
  };

  const departmentStats = [
    {
      name: 'Cardiology',
      patients: 245,
      appointments: 180,
      revenue: 12500,
      satisfaction: 96.2,
      color: '#ef4444'
    },
    {
      name: 'Neurology',
      patients: 198,
      appointments: 145,
      revenue: 9800,
      satisfaction: 94.8,
      color: '#8b5cf6'
    },
    {
      name: 'Orthopedics',
      patients: 312,
      appointments: 220,
      revenue: 15600,
      satisfaction: 93.5,
      color: '#10b981'
    },
    {
      name: 'Pediatrics',
      patients: 287,
      appointments: 195,
      revenue: 8900,
      satisfaction: 97.1,
      color: '#f59e0b'
    },
    {
      name: 'General Medicine',
      patients: 208,
      appointments: 116,
      revenue: 7200,
      satisfaction: 92.8,
      color: '#3b82f6'
    }
  ];

  const performanceMetrics = [
    {
      title: 'Average Wait Time',
      value: '12 min',
      target: '15 min',
      status: 'good',
      icon: Clock
    },
    {
      title: 'Appointment Completion',
      value: '94.5%',
      target: '90%',
      status: 'excellent',
      icon: CheckCircle
    },
    {
      title: 'No-Show Rate',
      value: '5.2%',
      target: '8%',
      status: 'good',
      icon: UserCheck
    },
    {
      title: 'Emergency Cases',
      value: '23',
      target: '30',
      status: 'warning',
      icon: AlertTriangle
    }
  ];

  const recentTrends = [
    {
      metric: 'Patient Registration',
      value: '+18%',
      period: 'vs last month',
      trend: 'up'
    },
    {
      metric: 'Online Bookings',
      value: '+25%',
      period: 'vs last month',
      trend: 'up'
    },
    {
      metric: 'Cancellation Rate',
      value: '-12%',
      period: 'vs last month',
      trend: 'down'
    },
    {
      metric: 'Staff Utilization',
      value: '+8%',
      period: 'vs last month',
      trend: 'up'
    }
  ];

  const getMaxValue = (data) => {
    return Math.max(...data.map(item => item.value));
  };

  const getStatusColor = (status) => {
    const colors = {
      excellent: '#10b981',
      good: '#3b82f6',
      warning: '#f59e0b',
      poor: '#ef4444'
    };
    return colors[status] || '#64748b';
  };

  return (
    <div className="statistics-page">
      <div className="statistics-header">
        <div className="header-left">
          <h1>Analytics & Statistics</h1>
          <p className="page-subtitle">Comprehensive insights and performance metrics</p>
        </div>
        <div className="header-actions">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-select"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="btn btn-outline">
            <RefreshCw size={16} />
            Refresh
          </button>
          <button className="btn btn-primary">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      <div className="overview-stats">
        {overviewStats.map((stat, index) => (
          <div key={index} className="overview-card">
            <div className="card-header">
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <stat.icon size={24} />
              </div>
              <div className="trend-indicator">
                {stat.trend === 'up' ? (
                  <ArrowUp size={16} className="trend-up" />
                ) : (
                  <ArrowDown size={16} className="trend-down" />
                )}
                <span className={`change-value ${stat.trend}`}>{stat.change}</span>
              </div>
            </div>
            <div className="card-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
              <p className="stat-description">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-section">
        <div className="main-chart">
          <div className="chart-header">
            <h3>Trends Overview</h3>
            <div className="chart-controls">
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="metric-select"
              >
                <option value="patients">Patients</option>
                <option value="appointments">Appointments</option>
                <option value="revenue">Revenue</option>
              </select>
            </div>
          </div>
          <div className="chart-container">
            <div className="chart-grid">
              {chartData[selectedMetric]?.map((item, index) => {
                const maxValue = getMaxValue(chartData[selectedMetric]);
                const height = (item.value / maxValue) * 100;
                return (
                  <div key={index} className="chart-bar-container">
                    <div 
                      className="chart-bar"
                      style={{ 
                        height: `${height}%`,
                        backgroundColor: overviewStats.find(s => s.title.toLowerCase().includes(selectedMetric.slice(0, -1)))?.color || '#3b82f6'
                      }}
                    >
                      <div className="bar-value">{item.value.toLocaleString()}</div>
                    </div>
                    <div className="bar-label">{item.month}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="performance-metrics">
          <h3>Performance Metrics</h3>
          <div className="metrics-list">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="metric-item">
                <div className="metric-icon" style={{ color: getStatusColor(metric.status) }}>
                  <metric.icon size={20} />
                </div>
                <div className="metric-content">
                  <div className="metric-header">
                    <span className="metric-title">{metric.title}</span>
                    <span className={`metric-status ${metric.status}`}>{metric.status}</span>
                  </div>
                  <div className="metric-values">
                    <span className="current-value">{metric.value}</span>
                    <span className="target-value">Target: {metric.target}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="detailed-analytics">
        <div className="department-stats">
          <div className="section-header">
            <h3>Department Performance</h3>
            <button className="btn btn-outline btn-sm">
              <Eye size={14} />
              View Details
            </button>
          </div>
          <div className="departments-grid">
            {departmentStats.map((dept, index) => (
              <div key={index} className="department-card">
                <div className="department-header">
                  <div className="department-color" style={{ backgroundColor: dept.color }}></div>
                  <h4 className="department-name">{dept.name}</h4>
                </div>
                <div className="department-metrics">
                  <div className="metric">
                    <span className="metric-label">Patients</span>
                    <span className="metric-value">{dept.patients}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Appointments</span>
                    <span className="metric-value">{dept.appointments}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Revenue</span>
                    <span className="metric-value">${dept.revenue.toLocaleString()}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Satisfaction</span>
                    <span className="metric-value">{dept.satisfaction}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="trends-sidebar">
          <div className="recent-trends">
            <h4>Recent Trends</h4>
            <div className="trends-list">
              {recentTrends.map((trend, index) => (
                <div key={index} className="trend-item">
                  <div className="trend-info">
                    <span className="trend-metric">{trend.metric}</span>
                    <span className="trend-period">{trend.period}</span>
                  </div>
                  <div className="trend-value">
                    {trend.trend === 'up' ? (
                      <ArrowUp size={14} className="trend-up" />
                    ) : (
                      <ArrowDown size={14} className="trend-down" />
                    )}
                    <span className={`trend-percentage ${trend.trend}`}>{trend.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="quick-insights">
            <h4>Quick Insights</h4>
            <div className="insights-list">
              <div className="insight-item">
                <div className="insight-icon success">
                  <TrendingUp size={16} />
                </div>
                <div className="insight-content">
                  <p className="insight-text">Patient satisfaction increased by 2.1% this month</p>
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-icon warning">
                  <Activity size={16} />
                </div>
                <div className="insight-content">
                  <p className="insight-text">Peak hours: 10 AM - 2 PM show highest activity</p>
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-icon info">
                  <BarChart3 size={16} />
                </div>
                <div className="insight-content">
                  <p className="insight-text">Orthopedics department leads in patient volume</p>
                </div>
              </div>
            </div>
          </div>

          <div className="export-options">
            <h4>Export Options</h4>
            <button className="export-btn">
              <Download size={14} />
              PDF Report
            </button>
            <button className="export-btn">
              <Download size={14} />
              Excel Data
            </button>
            <button className="export-btn">
              <Download size={14} />
              CSV Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;