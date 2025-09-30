import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Send, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Calendar,
  User,
  Receipt,
  X,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import './PaymentsPage.css';

const PaymentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('this-month');
  
  // Modal states
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showInvoiceDetailsModal, setShowInvoiceDetailsModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  // Sample payments data
  const payments = [
    {
      id: 'INV-001',
      patient: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
      },
      amount: 250.00,
      service: 'General Consultation',
      date: '2024-01-15',
      dueDate: '2024-01-30',
      status: 'paid',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN-12345'
    },
    {
      id: 'INV-002',
      patient: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
      },
      amount: 180.00,
      service: 'Dental Cleaning',
      date: '2024-01-14',
      dueDate: '2024-01-29',
      status: 'pending',
      paymentMethod: 'Insurance',
      transactionId: null
    },
    {
      id: 'INV-003',
      patient: {
        name: 'Emily Davis',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
      },
      amount: 320.00,
      service: 'Specialist Consultation',
      date: '2024-01-13',
      dueDate: '2024-01-28',
      status: 'overdue',
      paymentMethod: 'Cash',
      transactionId: null
    },
    {
      id: 'INV-004',
      patient: {
        name: 'Robert Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
      },
      amount: 150.00,
      service: 'Physical Therapy',
      date: '2024-01-12',
      dueDate: '2024-01-27',
      status: 'paid',
      paymentMethod: 'Debit Card',
      transactionId: 'TXN-12346'
    }
  ];

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

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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