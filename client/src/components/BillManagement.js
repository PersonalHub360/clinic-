import React, { useState, useEffect, useRef } from 'react';
import { 
  Receipt, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Calendar,
  User,
  FileText,
  MoreVertical,
  Printer
} from 'lucide-react';
import AddBillModal from './AddBillModal';
import EditBillModal from './EditBillModal';
import './BillManagement.css';

const BillManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showMoreMenu, setShowMoreMenu] = useState(null);
  const [showAddBillModal, setShowAddBillModal] = useState(false);
  const [showEditBillModal, setShowEditBillModal] = useState(false);
  const [editingBill, setEditingBill] = useState(null);
  const dropdownRef = useRef(null);

  // Mock data for bills
  const [bills, setBills] = useState([
    {
      id: 'BILL-001',
      patientName: 'John Doe',
      patientId: 'PAT-001',
      amount: 250.00,
      status: 'paid',
      issueDate: '2024-01-15',
      dueDate: '2024-02-15',
      services: ['Consultation', 'Blood Test'],
      description: 'Regular checkup and blood work'
    },
    {
      id: 'BILL-002',
      patientName: 'Jane Smith',
      patientId: 'PAT-002',
      amount: 450.00,
      status: 'pending',
      issueDate: '2024-01-20',
      dueDate: '2024-02-20',
      services: ['X-Ray', 'Consultation'],
      description: 'Chest X-ray and follow-up consultation'
    },
    {
      id: 'BILL-003',
      patientName: 'Mike Johnson',
      patientId: 'PAT-003',
      amount: 180.00,
      status: 'overdue',
      issueDate: '2024-01-10',
      dueDate: '2024-02-10',
      services: ['Consultation'],
      description: 'General consultation'
    }
  ]);

  // Mock patients data for the modal
  const mockPatients = [
    { id: 'PAT-001', name: 'John Doe' },
    { id: 'PAT-002', name: 'Jane Smith' },
    { id: 'PAT-003', name: 'Mike Johnson' },
    { id: 'PAT-004', name: 'Sarah Wilson' },
    { id: 'PAT-005', name: 'David Brown' }
  ];

  // Mock data for bill issues
  const [billIssues] = useState([
    {
      id: 'ISSUE-001',
      billId: 'BILL-002',
      patientName: 'Jane Smith',
      issue: 'Payment dispute',
      description: 'Patient disputes the X-ray charges',
      status: 'open',
      priority: 'high',
      createdDate: '2024-01-22',
      assignedTo: 'Dr. Wilson'
    },
    {
      id: 'ISSUE-002',
      billId: 'BILL-003',
      patientName: 'Mike Johnson',
      issue: 'Billing error',
      description: 'Incorrect service code applied',
      status: 'resolved',
      priority: 'medium',
      createdDate: '2024-01-18',
      assignedTo: 'Admin Staff'
    }
  ]);

  // Click outside effect to close dropdown menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMoreMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'overdue': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return <CheckCircle size={16} />;
      case 'pending': return <Clock size={16} />;
      case 'overdue': return <AlertTriangle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#64748b';
    }
  };

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || bill.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredIssues = billIssues.filter(issue => {
    const matchesSearch = issue.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.issue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || issue.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Handler functions
  const handleAddBill = () => {
    setShowAddBillModal(true);
  };

  const handleSaveBill = (billData) => {
    setBills(prev => [...prev, billData]);
    setShowAddBillModal(false);
  };

  const handleUpdateBill = (updatedBill) => {
    setBills(prev => prev.map(bill => 
      bill.id === updatedBill.id ? updatedBill : bill
    ));
  };

  const handleExportBills = () => {
    // Create CSV content
    const headers = ['Bill ID', 'Patient Name', 'Patient ID', 'Amount', 'Status', 'Issue Date', 'Due Date', 'Services', 'Description'];
    const csvContent = [
      headers.join(','),
      ...filteredBills.map(bill => [
        bill.id,
        `"${bill.patientName}"`,
        bill.patientId,
        bill.amount,
        bill.status,
        bill.issueDate,
        bill.dueDate,
        `"${bill.services.join('; ')}"`,
        `"${bill.description}"`
      ].join(','))
    ].join('\n');

    // Download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `bills_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewBill = (billId) => {
    alert(`View bill details for ${billId}`);
  };

  const handleEditBill = (billId) => {
    const billToEdit = bills.find(bill => bill.id === billId);
    if (billToEdit) {
      setEditingBill(billToEdit);
      setShowEditBillModal(true);
      setShowMoreMenu(null); // Close dropdown when opening edit modal
    }
  };

  const handleDeleteBill = (billId) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      setBills(prev => prev.filter(bill => bill.id !== billId));
      setShowMoreMenu(null);
    }
  };

  const handleDownloadPDF = (billId) => {
    alert(`Download PDF for bill ${billId}`);
  };

  const handleSendInvoice = (billId) => {
    alert(`Send invoice for bill ${billId}`);
  };

  const handlePrintInvoice = (billId) => {
    // Find the bill data
    const bill = bills.find(b => b.id === billId);
    if (!bill) {
      alert('Bill not found');
      return;
    }

    // Create a printable invoice HTML
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${bill.id}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .invoice-header { text-align: center; margin-bottom: 30px; }
          .invoice-details { margin-bottom: 20px; }
          .invoice-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          .invoice-table th { background-color: #f5f5f5; }
          .total-section { margin-top: 20px; text-align: right; }
          .total-amount { font-size: 18px; font-weight: bold; }
          .status-badge { padding: 4px 8px; border-radius: 4px; color: white; }
          .status-paid { background-color: #10b981; }
          .status-pending { background-color: #f59e0b; }
          .status-overdue { background-color: #ef4444; }
        </style>
      </head>
      <body>
        <div class="invoice-header">
          <h1>CLINIC DASHBOARD</h1>
          <h2>Payment Invoice</h2>
        </div>
        
        <div class="invoice-details">
          <p><strong>Invoice ID:</strong> ${bill.id}</p>
          <p><strong>Patient Name:</strong> ${bill.patientName}</p>
          <p><strong>Patient ID:</strong> ${bill.patientId}</p>
          <p><strong>Issue Date:</strong> ${bill.issueDate}</p>
          <p><strong>Due Date:</strong> ${bill.dueDate}</p>
          <p><strong>Status:</strong> <span class="status-badge status-${bill.status}">${bill.status.toUpperCase()}</span></p>
        </div>

        <table class="invoice-table">
          <thead>
            <tr>
              <th>Service Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${bill.services ? bill.services.map(service => `
              <tr>
                <td>${service}</td>
                <td>$${(bill.amount / bill.services.length).toFixed(2)}</td>
              </tr>
            `).join('') : `
              <tr>
                <td>${bill.description || 'Medical Services'}</td>
                <td>$${bill.amount.toFixed(2)}</td>
              </tr>
            `}
          </tbody>
        </table>

        <div class="total-section">
          <p class="total-amount">Total Amount: $${bill.amount.toFixed(2)}</p>
        </div>

        <div style="margin-top: 40px; text-align: center; color: #666;">
          <p>Thank you for choosing our clinic services!</p>
          <p>For any questions, please contact our billing department.</p>
        </div>
      </body>
      </html>
    `;

    // Open print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = function() {
      printWindow.print();
      printWindow.close();
    };
  };

  // Calculate statistics from actual bill data
  const calculateStats = () => {
    const totalRevenue = bills.reduce((sum, bill) => sum + bill.amount, 0);
    const pendingBills = bills.filter(bill => bill.status === 'pending').length;
    const overdueBills = bills.filter(bill => bill.status === 'overdue').length;
    const activeIssues = billIssues.filter(issue => issue.status === 'open').length;
    
    return {
      totalRevenue,
      pendingBills,
      overdueBills,
      activeIssues
    };
  };

  const stats = calculateStats();

  const renderOverview = () => (
    <div className="bill-overview">
      {/* Statistics Cards */}
      <div className="bill-stats">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#10b981' }}>
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">${stats.totalRevenue.toLocaleString()}</h3>
            <p className="stat-label">Total Revenue</p>
            <span className="stat-change">+12% from last month</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#f59e0b' }}>
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.pendingBills}</h3>
            <p className="stat-label">Pending Bills</p>
            <span className="stat-change">-3 from last week</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#ef4444' }}>
            <AlertTriangle size={24} />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.overdueBills}</h3>
            <p className="stat-label">Overdue Bills</p>
            <span className="stat-change">+1 from last week</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#8b5cf6' }}>
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.activeIssues}</h3>
            <p className="stat-label">Active Issues</p>
            <span className="stat-change">-1 from last week</span>
          </div>
        </div>
      </div>

      {/* Bills Table */}
      <div className="bills-table-container">
        <div className="table-header">
          <h3>Recent Bills</h3>
          <div className="table-actions">
            <button className="btn btn-secondary" onClick={handleExportBills}>
              <Download size={16} />
              Export
            </button>
            <button className="btn btn-primary" onClick={handleAddBill}>
              <Plus size={16} />
              New Bill
            </button>
          </div>
        </div>
        
        <div className="bills-table">
          <table>
            <thead>
              <tr>
                <th>Bill ID</th>
                <th>Patient</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.map((bill) => (
                <tr key={bill.id}>
                  <td className="bill-id">{bill.id}</td>
                  <td>
                    <div className="patient-info">
                      <span className="patient-name">{bill.patientName}</span>
                      <span className="patient-id">{bill.patientId}</span>
                    </div>
                  </td>
                  <td className="amount">${bill.amount.toFixed(2)}</td>
                  <td>
                    <span 
                      className="status-badge" 
                      style={{ backgroundColor: getStatusColor(bill.status) }}
                    >
                      {getStatusIcon(bill.status)}
                      {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                    </span>
                  </td>
                  <td>{bill.issueDate}</td>
                  <td>{bill.dueDate}</td>
                  <td>
                    <div className="action-buttons" ref={dropdownRef}>
                      <button className="action-btn" title="View Details" onClick={() => handleViewBill(bill.id)}>
                        <Eye size={16} />
                      </button>
                      <button className="action-btn" title="Edit" onClick={() => handleEditBill(bill.id)}>
                        <Edit size={16} />
                      </button>
                      <button 
                        className="action-btn more-btn"
                        onClick={() => setShowMoreMenu(showMoreMenu === bill.id ? null : bill.id)}
                      >
                        <MoreVertical size={16} />
                      </button>
                      {showMoreMenu === bill.id && (
                        <div className="more-menu">
                          <button className="menu-item" onClick={() => handleDownloadPDF(bill.id)}>
                            <Download size={14} />
                            Download PDF
                          </button>
                          <button className="menu-item" onClick={() => handlePrintInvoice(bill.id)}>
                            <Printer size={14} />
                            Print Invoice
                          </button>
                          <button className="menu-item" onClick={() => handleSendInvoice(bill.id)}>
                            <User size={14} />
                            Send Invoice
                          </button>
                          <button className="menu-item delete" onClick={() => handleDeleteBill(bill.id)}>
                            <Trash2 size={14} />
                            Delete
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
    </div>
  );

  const renderBillIssues = () => (
    <div className="bill-issues">
      <div className="issues-header">
        <h3>Bill Issues</h3>
        <button className="btn btn-primary">
          <Plus size={16} />
          Report Issue
        </button>
      </div>

      <div className="issues-list">
        {filteredIssues.map((issue) => (
          <div key={issue.id} className="issue-card">
            <div className="issue-header">
              <div className="issue-info">
                <h4 className="issue-title">{issue.issue}</h4>
                <p className="issue-description">{issue.description}</p>
              </div>
              <div className="issue-meta">
                <span 
                  className="priority-badge"
                  style={{ backgroundColor: getPriorityColor(issue.priority) }}
                >
                  {issue.priority.toUpperCase()}
                </span>
                <span 
                  className="status-badge"
                  style={{ 
                    backgroundColor: issue.status === 'open' ? '#f59e0b' : '#10b981'
                  }}
                >
                  {issue.status.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="issue-details">
              <div className="detail-item">
                <Receipt size={14} />
                <span>Bill: {issue.billId}</span>
              </div>
              <div className="detail-item">
                <User size={14} />
                <span>Patient: {issue.patientName}</span>
              </div>
              <div className="detail-item">
                <Calendar size={14} />
                <span>Created: {issue.createdDate}</span>
              </div>
              <div className="detail-item">
                <User size={14} />
                <span>Assigned: {issue.assignedTo}</span>
              </div>
            </div>

            <div className="issue-actions">
              <button className="btn btn-secondary btn-sm">
                <Eye size={14} />
                View Details
              </button>
              <button className="btn btn-primary btn-sm">
                <Edit size={14} />
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bill-management">
      <div className="bill-header">
        <div className="header-left">
          <h1 className="page-title">
            <Receipt className="page-icon" />
            Bill Management
          </h1>
          <p className="page-subtitle">Manage billing, invoices, and payment tracking</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Receipt size={16} />
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'issues' ? 'active' : ''}`}
          onClick={() => setActiveTab('issues')}
        >
          <AlertTriangle size={16} />
          Bill Issues
        </button>
      </div>

      {/* Search and Filter Controls */}
      <div className="bill-controls">
        <div className="search-filter-container">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder={activeTab === 'overview' ? "Search bills..." : "Search issues..."}
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
              {activeTab === 'overview' ? (
                <>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </>
              ) : (
                <>
                  <option value="open">Open</option>
                  <option value="resolved">Resolved</option>
                </>
              )}
            </select>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'issues' && renderBillIssues()}
      </div>

      {/* Add Bill Modal */}
      {showAddBillModal && (
        <AddBillModal
          isOpen={showAddBillModal}
          onClose={() => setShowAddBillModal(false)}
          onSave={handleSaveBill}
          patients={mockPatients}
        />
      )}

      {/* Edit Bill Modal */}
      {showEditBillModal && (
        <EditBillModal
          isOpen={showEditBillModal}
          onClose={() => {
            setShowEditBillModal(false);
            setEditingBill(null);
          }}
          onSave={handleUpdateBill}
          bill={editingBill}
          patients={mockPatients}
        />
      )}
    </div>
  );
};

export default BillManagement;