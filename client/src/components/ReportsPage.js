import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Filter, 
  Calendar, 
  Search, 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Activity,
  Eye,
  Printer,
  Mail,
  RefreshCw,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import './ReportsPage.css';

const ReportsPage = () => {
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [dateRange, setDateRange] = useState('last30days');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedReports, setSelectedReports] = useState([]);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  // Sample reports data
  const [reports] = useState([
    {
      id: 1,
      title: 'Monthly Patient Statistics',
      type: 'patient',
      description: 'Comprehensive overview of patient demographics and visit patterns',
      generatedDate: '2024-01-15',
      status: 'completed',
      size: '2.4 MB',
      format: 'PDF',
      category: 'Statistics',
      icon: Users,
      color: '#3b82f6'
    },
    {
      id: 2,
      title: 'Financial Revenue Report',
      type: 'financial',
      description: 'Detailed analysis of revenue streams and payment patterns',
      generatedDate: '2024-01-14',
      status: 'completed',
      size: '1.8 MB',
      format: 'Excel',
      category: 'Financial',
      icon: DollarSign,
      color: '#10b981'
    },
    {
      id: 3,
      title: 'Appointment Analytics',
      type: 'appointment',
      description: 'Analysis of appointment scheduling trends and no-show rates',
      generatedDate: '2024-01-13',
      status: 'completed',
      size: '3.1 MB',
      format: 'PDF',
      category: 'Operations',
      icon: Calendar,
      color: '#f59e0b'
    },
    {
      id: 4,
      title: 'Staff Performance Report',
      type: 'staff',
      description: 'Employee productivity and performance metrics',
      generatedDate: '2024-01-12',
      status: 'processing',
      size: '1.2 MB',
      format: 'PDF',
      category: 'HR',
      icon: Activity,
      color: '#8b5cf6'
    },
    {
      id: 5,
      title: 'Inventory Management Report',
      type: 'inventory',
      description: 'Medical supplies and equipment usage analysis',
      generatedDate: '2024-01-11',
      status: 'completed',
      size: '2.7 MB',
      format: 'Excel',
      category: 'Inventory',
      icon: BarChart3,
      color: '#ef4444'
    },
    {
      id: 6,
      title: 'Patient Satisfaction Survey',
      type: 'survey',
      description: 'Patient feedback and satisfaction ratings analysis',
      generatedDate: '2024-01-10',
      status: 'failed',
      size: '0 MB',
      format: 'PDF',
      category: 'Quality',
      icon: TrendingUp,
      color: '#06b6d4'
    }
  ]);

  const reportTypes = [
    { value: 'all', label: 'All Reports' },
    { value: 'patient', label: 'Patient Reports' },
    { value: 'financial', label: 'Financial Reports' },
    { value: 'appointment', label: 'Appointment Reports' },
    { value: 'staff', label: 'Staff Reports' },
    { value: 'inventory', label: 'Inventory Reports' },
    { value: 'survey', label: 'Survey Reports' }
  ];

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last3months', label: 'Last 3 Months' },
    { value: 'last6months', label: 'Last 6 Months' },
    { value: 'lastyear', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const filteredReports = reports.filter(report => {
    const matchesType = selectedReportType === 'all' || report.type === selectedReportType;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleSelectReport = (reportId) => {
    setSelectedReports(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleSelectAll = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(filteredReports.map(report => report.id));
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="status-icon completed" />;
      case 'processing':
        return <Clock className="status-icon processing" />;
      case 'failed':
        return <AlertCircle className="status-icon failed" />;
      default:
        return <Clock className="status-icon" />;
    }
  };

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div className="header-content">
          <div className="header-title">
            <FileText className="header-icon" />
            <div>
              <h1>Reports & Analytics</h1>
              <p>Generate, manage, and analyze clinic reports</p>
            </div>
          </div>
          <div className="header-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="btn-icon" />
              Filters
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => setShowGenerateModal(true)}
            >
              <Plus className="btn-icon" />
              Generate Report
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label>Report Type</label>
              <select 
                value={selectedReportType} 
                onChange={(e) => setSelectedReportType(e.target.value)}
                className="filter-select"
              >
                {reportTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Date Range</label>
              <select 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
                className="filter-select"
              >
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Search Reports</label>
              <div className="search-input-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="reports-stats">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#3b82f6' }}>
            <FileText />
          </div>
          <div className="stat-content">
            <div className="stat-number">{reports.length}</div>
            <div className="stat-label">Total Reports</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#10b981' }}>
            <CheckCircle />
          </div>
          <div className="stat-content">
            <div className="stat-number">{reports.filter(r => r.status === 'completed').length}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#f59e0b' }}>
            <Clock />
          </div>
          <div className="stat-content">
            <div className="stat-number">{reports.filter(r => r.status === 'processing').length}</div>
            <div className="stat-label">Processing</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#ef4444' }}>
            <AlertCircle />
          </div>
          <div className="stat-content">
            <div className="stat-number">{reports.filter(r => r.status === 'failed').length}</div>
            <div className="stat-label">Failed</div>
          </div>
        </div>
      </div>

      <div className="reports-content">
        <div className="reports-toolbar">
          <div className="toolbar-left">
            <button 
              className="btn btn-ghost"
              onClick={handleSelectAll}
            >
              {selectedReports.length === filteredReports.length ? 'Deselect All' : 'Select All'}
            </button>
            {selectedReports.length > 0 && (
              <>
                <button className="btn btn-ghost">
                  <Download className="btn-icon" />
                  Download ({selectedReports.length})
                </button>
                <button className="btn btn-ghost">
                  <Mail className="btn-icon" />
                  Email
                </button>
              </>
            )}
          </div>
          <div className="toolbar-right">
            <button className="btn btn-ghost">
              <RefreshCw className="btn-icon" />
              Refresh
            </button>
          </div>
        </div>

        <div className="reports-grid">
          {filteredReports.map(report => {
            const IconComponent = report.icon;
            return (
              <div 
                key={report.id} 
                className={`report-card ${selectedReports.includes(report.id) ? 'selected' : ''}`}
              >
                <div className="report-card-header">
                  <div className="report-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedReports.includes(report.id)}
                      onChange={() => handleSelectReport(report.id)}
                    />
                  </div>
                  <div className="report-status">
                    {getStatusIcon(report.status)}
                  </div>
                </div>

                <div className="report-card-content">
                  <div className="report-icon-container" style={{ backgroundColor: `${report.color}20` }}>
                    <IconComponent className="report-icon" style={{ color: report.color }} />
                  </div>
                  
                  <div className="report-info">
                    <h3 className="report-title">{report.title}</h3>
                    <p className="report-description">{report.description}</p>
                    
                    <div className="report-meta">
                      <span className="report-category">{report.category}</span>
                      <span className="report-format">{report.format}</span>
                      <span className="report-size">{report.size}</span>
                    </div>
                    
                    <div className="report-date">
                      Generated: {new Date(report.generatedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="report-card-actions">
                  <button className="action-btn" title="View Report">
                    <Eye />
                  </button>
                  <button className="action-btn" title="Download">
                    <Download />
                  </button>
                  <button className="action-btn" title="Print">
                    <Printer />
                  </button>
                  <button className="action-btn" title="Email">
                    <Mail />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredReports.length === 0 && (
          <div className="no-reports">
            <FileText className="no-reports-icon" />
            <h3>No Reports Found</h3>
            <p>Try adjusting your filters or generate a new report</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowGenerateModal(true)}
            >
              <Plus className="btn-icon" />
              Generate New Report
            </button>
          </div>
        )}
      </div>

      {/* Generate Report Modal */}
      {showGenerateModal && (
        <div className="modal-overlay" onClick={() => setShowGenerateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Generate New Report</h2>
              <button 
                className="modal-close"
                onClick={() => setShowGenerateModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Report Type</label>
                <select className="form-input">
                  <option>Patient Statistics</option>
                  <option>Financial Analysis</option>
                  <option>Appointment Analytics</option>
                  <option>Staff Performance</option>
                  <option>Inventory Report</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date Range</label>
                <div className="date-range-inputs">
                  <input type="date" className="form-input" />
                  <span>to</span>
                  <input type="date" className="form-input" />
                </div>
              </div>
              <div className="form-group">
                <label>Format</label>
                <div className="format-options">
                  <label className="format-option">
                    <input type="radio" name="format" value="pdf" defaultChecked />
                    <span>PDF</span>
                  </label>
                  <label className="format-option">
                    <input type="radio" name="format" value="excel" />
                    <span>Excel</span>
                  </label>
                  <label className="format-option">
                    <input type="radio" name="format" value="csv" />
                    <span>CSV</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowGenerateModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;