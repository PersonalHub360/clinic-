import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Upload, 
  DollarSign, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  CheckCircle, 
  X, 
  Eye, 
  Edit, 
  Trash2, 
  Send, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Building2, 
  Calendar, 
  User, 
  Receipt, 
  FileText, 
  Printer, 
  RefreshCw, 
  MoreHorizontal, 
  ArrowUpDown, 
  ChevronDown, 
  Settings, 
  PieChart, 
  BarChart3, 
  TrendingDown, 
  Wallet, 
  Target, 
  Activity 
} from 'lucide-react';
import './PaymentsPage.css';

const PaymentsPage = () => {
  // Enhanced state management
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('list');
  const [selectedTimeRange, setSelectedTimeRange] = useState('thisMonth');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Modal states
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [showInvoiceDetailsModal, setShowInvoiceDetailsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Enhanced mock data
  const [paymentsData, setPaymentsData] = useState({
    summary: {
      totalRevenue: 125450.75,
      pendingAmount: 18750.25,
      overdueAmount: 4320.50,
      thisMonthRevenue: 32180.00,
      totalTransactions: 1247,
      averageTransaction: 100.52,
      paymentMethods: {
        creditCard: 45.2,
        cash: 28.7,
        insurance: 18.5,
        bankTransfer: 7.6
      }
    },
    recentActivity: [
      {
        id: 'ACT001',
        type: 'payment_received',
        patient: 'Sarah Johnson',
        amount: 250.00,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        method: 'Credit Card'
      },
      {
        id: 'ACT002',
        type: 'refund_processed',
        patient: 'Michael Brown',
        amount: -75.00,
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        method: 'Bank Transfer'
      },
      {
        id: 'ACT003',
        type: 'invoice_sent',
        patient: 'Emily Davis',
        amount: 180.00,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        method: 'Email'
      }
    ],
    payments: [
      {
        id: 'INV-2024-001',
        patient: {
          id: 'P001',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+1 (555) 123-4567',
          insurance: 'Blue Cross Blue Shield'
        },
        amount: 450.00,
        service: 'General Consultation + Lab Tests',
        date: '2024-01-15',
        dueDate: '2024-02-15',
        status: 'paid',
        paymentMethod: 'Credit Card',
        transactionId: 'TXN-CC-001',
        doctor: 'Dr. Smith',
        department: 'General Medicine',
        insuranceClaim: {
          claimNumber: 'CLM-2024-001',
          status: 'approved',
          coveredAmount: 350.00,
          patientResponsibility: 100.00
        },
        paymentHistory: [
          {
            date: '2024-01-16',
            amount: 450.00,
            method: 'Credit Card',
            reference: 'TXN-CC-001'
          }
        ]
      },
      {
        id: 'INV-2024-002',
        patient: {
          id: 'P002',
          name: 'Michael Brown',
          email: 'michael.brown@email.com',
          phone: '+1 (555) 234-5678',
          insurance: 'Aetna'
        },
        amount: 750.00,
        service: 'Dental Cleaning + X-Ray',
        date: '2024-01-14',
        dueDate: '2024-02-14',
        status: 'pending',
        paymentMethod: null,
        transactionId: null,
        doctor: 'Dr. Wilson',
        department: 'Dentistry',
        insuranceClaim: {
          claimNumber: 'CLM-2024-002',
          status: 'pending',
          coveredAmount: 600.00,
          patientResponsibility: 150.00
        },
        paymentHistory: []
      },
      {
        id: 'INV-2024-003',
        patient: {
          id: 'P003',
          name: 'Emily Davis',
          email: 'emily.davis@email.com',
          phone: '+1 (555) 345-6789',
          insurance: 'United Healthcare'
        },
        amount: 320.00,
        service: 'Physical Therapy Session',
        date: '2024-01-10',
        dueDate: '2024-01-25',
        status: 'overdue',
        paymentMethod: null,
        transactionId: null,
        doctor: 'Dr. Johnson',
        department: 'Physical Therapy',
        insuranceClaim: {
          claimNumber: 'CLM-2024-003',
          status: 'rejected',
          coveredAmount: 0.00,
          patientResponsibility: 320.00
        },
        paymentHistory: []
      }
    ]
  });

  // Calculate statistics
  const calculateStats = () => {
    const { payments } = paymentsData;
    const paidPayments = payments.filter(p => p.status === 'paid');
    const pendingPayments = payments.filter(p => p.status === 'pending');
    const overduePayments = payments.filter(p => p.status === 'overdue');

    return {
      totalRevenue: paidPayments.reduce((sum, p) => sum + p.amount, 0),
      pendingAmount: pendingPayments.reduce((sum, p) => sum + p.amount, 0),
      overdueAmount: overduePayments.reduce((sum, p) => sum + p.amount, 0),
      totalTransactions: paidPayments.length,
      averageTransaction: paidPayments.length > 0 ? paidPayments.reduce((sum, p) => sum + p.amount, 0) / paidPayments.length : 0
    };
  };

  // Filter and sort payments
  const getFilteredPayments = () => {
    let filtered = paymentsData.payments.filter(payment => {
      const matchesSearch = payment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           payment.service.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
      const matchesPaymentMethod = paymentMethodFilter === 'all' || payment.paymentMethod === paymentMethodFilter;
      
      let matchesDateRange = true;
      if (dateRange.start && dateRange.end) {
        const paymentDate = new Date(payment.date);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        matchesDateRange = paymentDate >= startDate && paymentDate <= endDate;
      }
      
      return matchesSearch && matchesStatus && matchesPaymentMethod && matchesDateRange;
    });

    // Sort payments
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'patient':
          aValue = a.patient.name.toLowerCase();
          bValue = b.patient.name.toLowerCase();
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  // Event handlers
  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPayments([]);
    } else {
      setSelectedPayments(getFilteredPayments().map(p => p.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectPayment = (paymentId) => {
    if (selectedPayments.includes(paymentId)) {
      setSelectedPayments(selectedPayments.filter(id => id !== paymentId));
    } else {
      setSelectedPayments([...selectedPayments, paymentId]);
    }
  };

  const handleBulkAction = (action) => {
    setConfirmAction({
      type: action,
      payments: selectedPayments,
      message: `Are you sure you want to ${action} ${selectedPayments.length} selected payment(s)?`
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircle size={16} className="status-icon paid" />;
      case 'pending':
        return <Clock size={16} className="status-icon pending" />;
      case 'overdue':
        return <AlertCircle size={16} className="status-icon overdue" />;
      default:
        return null;
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'Credit Card':
        return <CreditCard size={16} />;
      case 'Cash':
        return <Banknote size={16} />;
      case 'Bank Transfer':
        return <Building2 size={16} />;
      case 'Mobile Payment':
        return <Smartphone size={16} />;
      default:
        return <Wallet size={16} />;
    }
  };

  const getStatusClass = (status) => {
    return `status-${status}`;
  };

  const getPriorityClass = (status) => {
    if (status === 'overdue') return 'priority-high';
    if (status === 'pending') return 'priority-medium';
    return 'priority-low';
  };

  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,450',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: '#10b981'
    },
    {
      title: 'Pending Payments',
      value: '$3,280',
      change: '-5.2%',
      trend: 'down',
      icon: Clock,
      color: '#f59e0b'
    },
    {
      title: 'Overdue Amount',
      value: '$890',
      change: '+8.1%',
      trend: 'up',
      icon: AlertCircle,
      color: '#ef4444'
    },
    {
      title: 'This Month',
      value: '$8,750',
      change: '+15.3%',
      trend: 'up',
      icon: TrendingUp,
      color: '#3b82f6'
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'payment',
      patient: 'Sarah Johnson',
      amount: 250.00,
      time: '2 hours ago',
      method: 'Credit Card'
    },
    {
      id: 2,
      type: 'refund',
      patient: 'John Smith',
      amount: -75.00,
      time: '5 hours ago',
      method: 'Bank Transfer'
    },
    {
      id: 3,
      type: 'payment',
      patient: 'Emily Davis',
      amount: 180.00,
      time: '1 day ago',
      method: 'Cash'
    }
  ];

  const filteredPayments = getFilteredPayments();

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Payment management functions
  const handleNewInvoice = () => {
    setShowNewInvoiceModal(true);
  };

  const handleViewInvoice = (payment) => {
    setSelectedPayment(payment);
    setShowInvoiceDetailsModal(true);
  };

  const handleProcessPayment = (payment) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const handleSendReminder = (payment) => {
    setConfirmAction({
      type: 'send_reminder',
      payment: payment,
      title: 'Send Payment Reminder',
      message: `Send a payment reminder to ${payment.patient.name} for invoice ${payment.id}?`
    });
    setShowConfirmDialog(true);
  };

  const handleDownloadInvoice = (payment) => {
    // Simulate invoice download
    alert(`Downloading invoice ${payment.id} for ${payment.patient.name}...`);
  };

  const handleExportData = () => {
    // Simulate data export
    alert('Exporting payment data...');
  };

  const handleCreateInvoice = () => {
    setShowNewInvoiceModal(true);
  };

  const handleSendBulkReminder = () => {
    setConfirmAction({
      type: 'bulk_reminder',
      title: 'Send Bulk Reminders',
      message: 'Send payment reminders to all patients with overdue invoices?'
    });
    setShowConfirmDialog(true);
  };

  const handleExportReport = () => {
    alert('Generating financial report...');
  };

  const closeModals = () => {
    setShowNewInvoiceModal(false);
    setShowPaymentModal(false);
    setShowInvoiceDetailsModal(false);
    setShowConfirmDialog(false);
    setSelectedPayment(null);
    setConfirmAction(null);
  };

  const handleConfirmAction = () => {
    if (confirmAction) {
      switch (confirmAction.type) {
        case 'send_reminder':
          alert(`Payment reminder sent to ${confirmAction.payment.patient.name}`);
          break;
        case 'bulk_reminder':
          alert('Bulk payment reminders sent successfully');
          break;
        default:
          break;
      }
    }
    closeModals();
  };

  return (
    <div className="payments-page">
      <div className="payments-header">
        <div className="header-left">
          <h1>Payments & Billing</h1>
          <p className="page-subtitle">Manage payments, invoices, and financial records</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={handleExportData}>
            <Download size={16} />
            Export
          </button>
          <button className="btn btn-primary" onClick={handleNewInvoice}>
            <Receipt size={16} />
            New Invoice
          </button>
        </div>
      </div>

      <div className="payments-stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <stat.icon size={20} />
              </div>
              <div className={`stat-change ${stat.trend}`}>
                {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.change}
              </div>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="payments-controls">
        <div className="search-filter">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search payments, invoices, or patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filter-controls">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="filter-select"
          >
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="this-quarter">This Quarter</option>
            <option value="this-year">This Year</option>
          </select>
        </div>
      </div>

      <div className="payments-content">
        <div className="payments-table-section">
          <div className="section-header">
            <h3>Payment Records</h3>
            <div className="table-actions">
              <button className="btn btn-sm btn-outline">
                <Filter size={14} />
                Filter
              </button>
            </div>
          </div>

          <div className="payments-table">
            <div className="table-header">
              <div className="table-row">
                <div className="table-cell">Invoice</div>
                <div className="table-cell">Patient</div>
                <div className="table-cell">Service</div>
                <div className="table-cell">Amount</div>
                <div className="table-cell">Date</div>
                <div className="table-cell">Status</div>
                <div className="table-cell">Actions</div>
              </div>
            </div>
            <div className="table-body">
              {filteredPayments.map((payment) => (
                <div key={payment.id} className="table-row">
                  <div className="table-cell">
                    <span className="invoice-id">{payment.id}</span>
                  </div>
                  <div className="table-cell">
                    <div className="patient-info">
                      <img
                        src={payment.patient.avatar}
                        alt={payment.patient.name}
                        className="patient-avatar-sm"
                      />
                      <span>{payment.patient.name}</span>
                    </div>
                  </div>
                  <div className="table-cell">
                    <span className="service-name">{payment.service}</span>
                  </div>
                  <div className="table-cell">
                    <span className="amount">${payment.amount.toFixed(2)}</span>
                  </div>
                  <div className="table-cell">
                    <span className="date">{new Date(payment.date).toLocaleDateString()}</span>
                  </div>
                  <div className="table-cell">
                    <div className={`status-badge ${payment.status}`}>
                      {getStatusIcon(payment.status)}
                      {payment.status}
                    </div>
                  </div>
                  <div className="table-cell">
                    <div className="action-buttons">
                      <button className="btn btn-sm btn-ghost" onClick={() => handleViewInvoice(payment)}>
                        <Eye size={14} />
                      </button>
                      <button className="btn btn-sm btn-ghost" onClick={() => handleSendReminder(payment)}>
                        <Send size={14} />
                      </button>
                      <button className="btn btn-sm btn-ghost" onClick={() => handleDownloadInvoice(payment)}>
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="payments-sidebar">
          <div className="recent-transactions">
            <h4>Recent Transactions</h4>
            <div className="transactions-list">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-info">
                    <div className={`transaction-type ${transaction.type}`}>
                      {transaction.type === 'payment' ? (
                        <TrendingUp size={16} />
                      ) : (
                        <TrendingDown size={16} />
                      )}
                    </div>
                    <div className="transaction-details">
                      <p className="transaction-patient">{transaction.patient}</p>
                      <p className="transaction-method">{transaction.method}</p>
                    </div>
                  </div>
                  <div className="transaction-amount">
                    <span className={transaction.amount > 0 ? 'positive' : 'negative'}>
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                    <span className="transaction-time">{transaction.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="payment-summary">
            <h4>Payment Summary</h4>
            <div className="summary-items">
              <div className="summary-item">
                <span className="summary-label">Total Invoices</span>
                <span className="summary-value">24</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Paid Invoices</span>
                <span className="summary-value">18</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Pending Invoices</span>
                <span className="summary-value">4</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Overdue Invoices</span>
                <span className="summary-value">2</span>
              </div>
            </div>
          </div>

          <div className="quick-actions">
            <h4>Quick Actions</h4>
            <button className="quick-btn" onClick={handleCreateInvoice}>
              <Receipt size={16} />
              Create Invoice
            </button>
            <button className="quick-btn" onClick={handleSendBulkReminder}>
              <Send size={16} />
              Send Reminder
            </button>
            <button className="quick-btn" onClick={handleExportReport}>
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* New Invoice Modal */}
      {showNewInvoiceModal && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Invoice</h2>
              <button className="close-btn" onClick={closeModals}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <form className="invoice-form">
                <div className="form-group">
                  <label>Patient</label>
                  <select>
                    <option value="">Select Patient</option>
                    <option value="sarah">Sarah Johnson</option>
                    <option value="michael">Michael Chen</option>
                    <option value="emily">Emily Davis</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Service</label>
                  <input type="text" placeholder="Enter service description" />
                </div>
                <div className="form-group">
                  <label>Amount</label>
                  <input type="number" placeholder="0.00" step="0.01" />
                </div>
                <div className="form-group">
                  <label>Due Date</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea placeholder="Additional notes (optional)"></textarea>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-outline" onClick={closeModals}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" onClick={(e) => { e.preventDefault(); alert('Invoice created successfully!'); closeModals(); }}>
                    Create Invoice
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Payment Processing Modal */}
      {showPaymentModal && selectedPayment && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Process Payment</h2>
              <button className="close-btn" onClick={closeModals}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="payment-details">
                <h4>Invoice: {selectedPayment.id}</h4>
                <p>Patient: {selectedPayment.patient.name}</p>
                <p>Amount: ${selectedPayment.amount.toFixed(2)}</p>
              </div>
              <form className="payment-form">
                <div className="form-group">
                  <label>Payment Method</label>
                  <select>
                    <option value="credit-card">Credit Card</option>
                    <option value="debit-card">Debit Card</option>
                    <option value="cash">Cash</option>
                    <option value="check">Check</option>
                    <option value="insurance">Insurance</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Amount Received</label>
                  <input type="number" defaultValue={selectedPayment.amount} step="0.01" />
                </div>
                <div className="form-group">
                  <label>Transaction ID</label>
                  <input type="text" placeholder="Enter transaction ID" />
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea placeholder="Payment notes (optional)"></textarea>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-outline" onClick={closeModals}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" onClick={(e) => { e.preventDefault(); alert('Payment processed successfully!'); closeModals(); }}>
                    Process Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Details Modal */}
      {showInvoiceDetailsModal && selectedPayment && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Invoice Details</h2>
              <button className="close-btn" onClick={closeModals}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="invoice-details">
                <div className="invoice-header">
                  <h3>Invoice {selectedPayment.id}</h3>
                  <div className={`status-badge ${selectedPayment.status}`}>
                    {getStatusIcon(selectedPayment.status)}
                    {selectedPayment.status}
                  </div>
                </div>
                <div className="invoice-info">
                  <div className="info-row">
                    <span className="label">Patient:</span>
                    <span className="value">{selectedPayment.patient.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Service:</span>
                    <span className="value">{selectedPayment.service}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Amount:</span>
                    <span className="value">${selectedPayment.amount.toFixed(2)}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Date:</span>
                    <span className="value">{new Date(selectedPayment.date).toLocaleDateString()}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Due Date:</span>
                    <span className="value">{new Date(selectedPayment.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Payment Method:</span>
                    <span className="value">{selectedPayment.paymentMethod}</span>
                  </div>
                  {selectedPayment.transactionId && (
                    <div className="info-row">
                      <span className="label">Transaction ID:</span>
                      <span className="value">{selectedPayment.transactionId}</span>
                    </div>
                  )}
                </div>
                <div className="modal-actions">
                  <button className="btn btn-outline" onClick={() => handleDownloadInvoice(selectedPayment)}>
                    <Download size={16} />
                    Download
                  </button>
                  {selectedPayment.status !== 'paid' && (
                    <button className="btn btn-primary" onClick={() => handleProcessPayment(selectedPayment)}>
                      <CreditCard size={16} />
                      Process Payment
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      {showConfirmDialog && confirmAction && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{confirmAction.title}</h2>
              <button className="close-btn" onClick={closeModals}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p>{confirmAction.message}</p>
              <div className="modal-actions">
                <button className="btn btn-outline" onClick={closeModals}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleConfirmAction}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;