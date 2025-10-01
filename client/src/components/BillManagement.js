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
  Printer,
  RefreshCw,
  Settings,
  BarChart3,
  Send,
  CreditCard,
  Building2,
  TrendingUp,
  TrendingDown,
  Activity,
  X,
  ArrowUpDown,
  Upload,
  FileSpreadsheet,
  FilePdf,
  Mail,
  Phone,
  MapPin,
  Copy,
  ExternalLink,
  Zap,
  Shield,
  AlertCircle
} from 'lucide-react';
import AddBillModal from './AddBillModal';
import EditBillModal from './EditBillModal';
import './BillManagement.css';

const generateInvoiceHTML = (bill) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Invoice - ${bill.id}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .invoice-header { text-align: center; margin-bottom: 30px; }
        .invoice-details { margin-bottom: 20px; }
        .total-section { margin-top: 20px; text-align: right; }
        .total-amount { font-size: 18px; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="invoice-header">
        <h1>Medical Invoice</h1>
        <p>Invoice #: ${bill.id}</p>
      </div>
      
      <div class="invoice-details">
        <p><strong>Patient:</strong> ${bill.patientName}</p>
        <p><strong>Date:</strong> ${bill.date}</p>
        <p><strong>Service:</strong> ${bill.service}</p>
        <p><strong>Description:</strong> ${bill.description}</p>
      </div>

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
};

const BillManagement = () => {
  // Enhanced state management
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [selectedBills, setSelectedBills] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // Modal states
  const [showAddBillModal, setShowAddBillModal] = useState(false);
  const [showEditBillModal, setShowEditBillModal] = useState(false);
  const [showBillDetailsModal, setShowBillDetailsModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  
  const [editingBill, setEditingBill] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);
  const dropdownRef = useRef(null);

  // Enhanced mock data for bills with comprehensive information
  const [billsData] = useState({
    bills: [
      {
        id: 'INV-2024-001',
        billNumber: 'BILL-001',
        patientName: 'John Doe',
        patientId: 'PAT-001',
        patient: {
          name: 'John Doe',
          email: 'john.doe@email.com',
          phone: '+1 (555) 123-4567',
          address: '123 Main St, City, State 12345',
          insurance: 'Blue Cross Blue Shield',
          memberNumber: 'BC123456789'
        },
        amount: 1250.00,
        subtotal: 1150.00,
        tax: 100.00,
        discount: 0.00,
        status: 'paid',
        type: 'consultation',
        issueDate: '2024-01-15',
        dueDate: '2024-02-15',
        paidDate: '2024-01-20',
        paymentMethod: 'Credit Card',
        transactionId: 'TXN-001',
        services: [
          { name: 'General Consultation', code: 'CONS-001', quantity: 1, rate: 150.00, amount: 150.00 },
          { name: 'Blood Test - Complete Panel', code: 'LAB-001', quantity: 1, rate: 300.00, amount: 300.00 },
          { name: 'ECG', code: 'DIAG-001', quantity: 1, rate: 200.00, amount: 200.00 },
          { name: 'Prescription Medication', code: 'MED-001', quantity: 1, rate: 500.00, amount: 500.00 }
        ],
        doctor: 'Dr. Sarah Wilson',
        department: 'General Medicine',
        notes: 'Regular annual checkup with comprehensive health screening',
        insuranceClaim: {
          claimNumber: 'CLM-2024-001',
          status: 'approved',
          coveredAmount: 1000.00,
          patientResponsibility: 250.00,
          deductible: 100.00,
          copay: 50.00
        },
        priority: 'normal'
      },
      {
        id: 'INV-2024-002',
        billNumber: 'BILL-002',
        patientName: 'Jane Smith',
        patientId: 'PAT-002',
        patient: {
          name: 'Jane Smith',
          email: 'jane.smith@email.com',
          phone: '+1 (555) 234-5678',
          address: '456 Oak Ave, City, State 12345',
          insurance: 'Aetna Health',
          memberNumber: 'AET987654321'
        },
        amount: 2450.00,
        subtotal: 2250.00,
        tax: 200.00,
        discount: 0.00,
        status: 'pending',
        type: 'procedure',
        issueDate: '2024-01-20',
        dueDate: '2024-02-20',
        paidDate: null,
        paymentMethod: null,
        transactionId: null,
        services: [
          { name: 'Specialist Consultation', code: 'CONS-002', quantity: 1, rate: 250.00, amount: 250.00 },
          { name: 'MRI Scan', code: 'DIAG-002', quantity: 1, rate: 1500.00, amount: 1500.00 },
          { name: 'Physical Therapy Session', code: 'THER-001', quantity: 2, rate: 125.00, amount: 250.00 },
          { name: 'Follow-up Consultation', code: 'CONS-003', quantity: 1, rate: 150.00, amount: 150.00 },
          { name: 'Medication', code: 'MED-002', quantity: 1, rate: 100.00, amount: 100.00 }
        ],
        doctor: 'Dr. Michael Chen',
        department: 'Orthopedics',
        notes: 'Post-injury assessment and treatment plan',
        insuranceClaim: {
          claimNumber: 'CLM-2024-002',
          status: 'pending',
          coveredAmount: 1960.00,
          patientResponsibility: 490.00,
          deductible: 200.00,
          copay: 75.00
        },
        priority: 'high'
      },
      {
        id: 'INV-2024-003',
        billNumber: 'BILL-003',
        patientName: 'Mike Johnson',
        patientId: 'PAT-003',
        patient: {
          name: 'Mike Johnson',
          email: 'mike.johnson@email.com',
          phone: '+1 (555) 345-6789',
          address: '789 Pine St, City, State 12345',
          insurance: 'United Healthcare',
          memberNumber: 'UHC456789123'
        },
        amount: 680.00,
        subtotal: 620.00,
        tax: 60.00,
        discount: 50.00,
        status: 'overdue',
        type: 'emergency',
        issueDate: '2024-01-10',
        dueDate: '2024-02-10',
        paidDate: null,
        paymentMethod: null,
        transactionId: null,
        services: [
          { name: 'Emergency Consultation', code: 'EMRG-001', quantity: 1, rate: 300.00, amount: 300.00 },
          { name: 'X-Ray Chest', code: 'DIAG-003', quantity: 1, rate: 200.00, amount: 200.00 },
          { name: 'Emergency Medication', code: 'MED-003', quantity: 1, rate: 120.00, amount: 120.00 }
        ],
        doctor: 'Dr. Emily Rodriguez',
        department: 'Emergency Medicine',
        notes: 'Emergency visit for chest pain evaluation',
        insuranceClaim: null,
        priority: 'urgent'
      },
      {
        id: 'INV-2024-004',
        billNumber: 'BILL-004',
        patientName: 'Sarah Wilson',
        patientId: 'PAT-004',
        patient: {
          name: 'Sarah Wilson',
          email: 'sarah.wilson@email.com',
          phone: '+1 (555) 456-7890',
          address: '321 Elm St, City, State 12345',
          insurance: 'Cigna Health',
          memberNumber: 'CIG789123456'
        },
        amount: 3200.00,
        subtotal: 2900.00,
        tax: 300.00,
        discount: 100.00,
        status: 'partially_paid',
        type: 'surgery',
        issueDate: '2024-01-25',
        dueDate: '2024-02-25',
        paidDate: '2024-01-30',
        paymentMethod: 'Bank Transfer',
        transactionId: 'TXN-004',
        paidAmount: 1600.00,
        services: [
          { name: 'Surgical Procedure', code: 'SURG-001', quantity: 1, rate: 2000.00, amount: 2000.00 },
          { name: 'Anesthesia', code: 'ANES-001', quantity: 1, rate: 500.00, amount: 500.00 },
          { name: 'Post-op Care', code: 'CARE-001', quantity: 3, rate: 100.00, amount: 300.00 },
          { name: 'Surgical Supplies', code: 'SUPP-001', quantity: 1, rate: 200.00, amount: 200.00 }
        ],
        doctor: 'Dr. Robert Kim',
        department: 'Surgery',
        notes: 'Minimally invasive surgical procedure with post-operative care',
        insuranceClaim: {
          claimNumber: 'CLM-2024-004',
          status: 'approved',
          coveredAmount: 2560.00,
          patientResponsibility: 640.00,
          deductible: 300.00,
          copay: 100.00
        },
        priority: 'high'
      }
    ],
    summary: {
      totalBills: 156,
      totalAmount: 45680.00,
      paidAmount: 32450.00,
      pendingAmount: 8930.00,
      overdueAmount: 4300.00,
      thisMonth: {
        bills: 23,
        amount: 12450.00,
        growth: 15.3
      },
      avgBillAmount: 293.00,
      paymentRate: 71.2
    },
    recentActivity: [
      {
        id: 'ACT-001',
        type: 'bill_created',
        description: 'New bill created for John Doe',
        amount: 1250.00,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        user: 'Dr. Sarah Wilson'
      },
      {
        id: 'ACT-002',
        type: 'payment_received',
        description: 'Payment received from Jane Smith',
        amount: 2450.00,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        user: 'System'
      },
      {
        id: 'ACT-003',
        type: 'bill_overdue',
        description: 'Bill overdue for Mike Johnson',
        amount: 680.00,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        user: 'System'
      }
    ],
    templates: [
      {
        id: 'TMPL-001',
        name: 'General Consultation',
        description: 'Standard consultation template',
        services: [
          { name: 'Consultation', code: 'CONS-001', rate: 150.00 },
          { name: 'Basic Examination', code: 'EXAM-001', rate: 75.00 }
        ]
      },
      {
        id: 'TMPL-002',
        name: 'Emergency Visit',
        description: 'Emergency department template',
        services: [
          { name: 'Emergency Consultation', code: 'EMRG-001', rate: 300.00 },
          { name: 'Triage Assessment', code: 'TRIA-001', rate: 100.00 }
        ]
      }
    ]
  });

  // Mock patients data for the modal
  const mockPatients = [
    { id: 'PAT-001', name: 'John Doe', email: 'john.doe@email.com', phone: '+1 (555) 123-4567' },
    { id: 'PAT-002', name: 'Jane Smith', email: 'jane.smith@email.com', phone: '+1 (555) 234-5678' },
    { id: 'PAT-003', name: 'Mike Johnson', email: 'mike.johnson@email.com', phone: '+1 (555) 345-6789' },
    { id: 'PAT-004', name: 'Sarah Wilson', email: 'sarah.wilson@email.com', phone: '+1 (555) 456-7890' },
    { id: 'PAT-005', name: 'David Brown', email: 'david.brown@email.com', phone: '+1 (555) 567-8901' }
  ];

  // Enhanced mock data for bill issues
  const [billIssues] = useState([
    {
      id: 'ISSUE-001',
      billId: 'INV-2024-002',
      patientName: 'Jane Smith',
      issue: 'Insurance Coverage Dispute',
      description: 'Patient disputes MRI coverage amount',
      status: 'open',
      priority: 'high',
      createdDate: '2024-01-22',
      assignedTo: 'Dr. Wilson',
      category: 'insurance',
      estimatedResolution: '2024-02-05'
    },
    {
      id: 'ISSUE-002',
      billId: 'INV-2024-003',
      patientName: 'Mike Johnson',
      issue: 'Billing Code Error',
      description: 'Incorrect procedure code applied to emergency visit',
      status: 'resolved',
      priority: 'medium',
      createdDate: '2024-01-18',
      resolvedDate: '2024-01-25',
      assignedTo: 'Billing Team',
      category: 'coding',
      resolution: 'Code corrected and bill updated'
    }
  ]);

  // Calculate statistics
  const calculateStats = () => {
    const bills = getFilteredBills();
    const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);
    const paidAmount = bills.filter(bill => bill.status === 'paid').reduce((sum, bill) => sum + bill.amount, 0);
    const pendingAmount = bills.filter(bill => bill.status === 'pending').reduce((sum, bill) => sum + bill.amount, 0);
    const overdueAmount = bills.filter(bill => bill.status === 'overdue').reduce((sum, bill) => sum + bill.amount, 0);
    
    return {
      totalBills: bills.length,
      totalAmount,
      paidAmount,
      pendingAmount,
      overdueAmount,
      paymentRate: totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0
    };
  };

  // Enhanced filtering and sorting
  const getFilteredBills = () => {
    let filtered = billsData.bills.filter(bill => {
      const matchesSearch = 
        bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.doctor.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || bill.status === filterStatus;
      const matchesType = filterType === 'all' || bill.type === filterType;
      
      // Date range filter
      let matchesDateRange = true;
      if (dateRange.start && dateRange.end) {
        const billDate = new Date(bill.issueDate);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        matchesDateRange = billDate >= startDate && billDate <= endDate;
      }
      
      // Amount range filter
      let matchesAmountRange = true;
      if (amountRange.min || amountRange.max) {
        const min = parseFloat(amountRange.min) || 0;
        const max = parseFloat(amountRange.max) || Infinity;
        matchesAmountRange = bill.amount >= min && bill.amount <= max;
      }
      
      return matchesSearch && matchesStatus && matchesType && matchesDateRange && matchesAmountRange;
    });

    // Sort bills
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.issueDate);
          bValue = new Date(b.issueDate);
          break;
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'patient':
          aValue = a.patientName.toLowerCase();
          bValue = b.patientName.toLowerCase();
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = a.issueDate;
          bValue = b.issueDate;
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
      setSelectedBills([]);
    } else {
      setSelectedBills(getFilteredBills().map(bill => bill.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectBill = (billId) => {
    if (selectedBills.includes(billId)) {
      setSelectedBills(selectedBills.filter(id => id !== billId));
    } else {
      setSelectedBills([...selectedBills, billId]);
    }
  };

  const handleBulkAction = (action) => {
    const selectedBillsData = billsData.bills.filter(bill => selectedBills.includes(bill.id));
    
    switch (action) {
      case 'send_invoice':
        setConfirmAction({
          type: 'send_invoice',
          bills: selectedBillsData,
          message: `Send invoices to ${selectedBills.length} patient(s)?`
        });
        break;
      case 'mark_paid':
        setConfirmAction({
          type: 'mark_paid',
          bills: selectedBillsData,
          message: `Mark ${selectedBills.length} bill(s) as paid?`
        });
        break;
      case 'export':
        handleExportBills(selectedBillsData);
        break;
      case 'print':
        handlePrintBills(selectedBillsData);
        break;
      default:
        break;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="status-icon" />;
      case 'pending':
        return <Clock className="status-icon" />;
      case 'overdue':
        return <AlertTriangle className="status-icon" />;
      case 'partially_paid':
        return <DollarSign className="status-icon" />;
      default:
        return <Clock className="status-icon" />;
    }
  };

  const getStatusClass = (status) => {
    return `bill-row ${status}`;
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority}`;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'consultation':
        return <User className="type-icon" />;
      case 'procedure':
        return <Activity className="type-icon" />;
      case 'emergency':
        return <Zap className="type-icon" />;
      case 'surgery':
        return <Shield className="type-icon" />;
      default:
        return <FileText className="type-icon" />;
    }
  };

  // Additional state for missing functionality
  const [showMoreMenu, setShowMoreMenu] = useState({});
  const [filteredIssues] = useState([]);

  // Missing utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return '#10b981';
      case 'pending':
        return '#f59e0b';
      case 'overdue':
        return '#ef4444';
      case 'partially_paid':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const handleDownloadPDF = (bill) => {
    // Generate PDF download
    const invoiceHTML = generateInvoiceHTML(bill);
    const printWindow = window.open('', '_blank');
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
    printWindow.print();
  };

  const handlePrintInvoice = (bill) => {
    // Print invoice functionality
    const invoiceHTML = generateInvoiceHTML(bill);
    const printWindow = window.open('', '_blank');
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
    printWindow.print();
  };

  const handleAddBill = () => {
    setShowAddBillModal(true);
  };

  // Bill management functions
  const handleNewBill = () => {
    setShowAddBillModal(true);
  };

  const handleEditBill = (bill) => {
    setEditingBill(bill);
    setShowEditBillModal(true);
  };

  const handleViewBill = (bill) => {
    setSelectedBill(bill);
    setShowBillDetailsModal(true);
  };

  const handleDeleteBill = (bill) => {
    setConfirmAction({
      type: 'delete_bill',
      bill: bill,
      message: `Delete bill ${bill.billNumber} for ${bill.patientName}?`
    });
  };

  const handleSendInvoice = (bill) => {
    setConfirmAction({
      type: 'send_invoice',
      bill: bill,
      message: `Send invoice to ${bill.patientName}?`
    });
  };

  const handlePrintBill = (bill) => {
    // Implement print functionality
    window.print();
  };

  const handlePrintBills = (bills) => {
    // Implement bulk print functionality
    window.print();
  };

  const handleExportBills = (bills = null) => {
    const billsToExport = bills || getFilteredBills();
    
    const csvData = billsToExport.map(bill => ({
      'Bill ID': bill.id,
      'Bill Number': bill.billNumber,
      'Patient Name': bill.patientName,
      'Amount': bill.amount,
      'Status': bill.status,
      'Issue Date': bill.issueDate,
      'Due Date': bill.dueDate,
      'Doctor': bill.doctor,
      'Department': bill.department
    }));
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + Object.keys(csvData[0]).join(",") + "\n"
      + csvData.map(row => Object.values(row).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "bills_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = calculateStats();
  const filteredBills = getFilteredBills();
  return (
    <div className="bill-management">
      {/* Enhanced Header */}
      <div className="bill-header">
        <div className="header-left">
          <div className="header-title">
            <Receipt className="header-icon" />
            <div>
              <h1>Bill Management</h1>
              <p>Manage invoices, billing, and financial records</p>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button 
            className="btn-secondary"
            onClick={() => setShowTemplateModal(true)}
          >
            <FileText size={16} />
            Templates
          </button>
          <button 
            className="btn-secondary"
            onClick={() => setShowReportsModal(true)}
          >
            <BarChart3 size={16} />
            Reports
          </button>
          <button 
            className="btn-secondary"
            onClick={() => setShowSettingsModal(true)}
          >
            <Settings size={16} />
            Settings
          </button>
          <button 
            className="btn-primary"
            onClick={handleNewBill}
          >
            <Plus size={16} />
            New Bill
          </button>
        </div>
      </div>

      {/* Enhanced Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">
            <Receipt />
          </div>
          <div className="stat-content">
            <h3>${stats.totalAmount.toLocaleString()}</h3>
            <p>Total Amount</p>
            <span className="stat-change positive">
              <TrendingUp size={14} />
              +{billsData.summary.thisMonth.growth}%
            </span>
          </div>
        </div>
        <div className="stat-card paid">
          <div className="stat-icon">
            <CheckCircle />
          </div>
          <div className="stat-content">
            <h3>${stats.paidAmount.toLocaleString()}</h3>
            <p>Paid Amount</p>
            <span className="stat-change positive">
              {stats.paymentRate.toFixed(1)}% rate
            </span>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">
            <Clock />
          </div>
          <div className="stat-content">
            <h3>${stats.pendingAmount.toLocaleString()}</h3>
            <p>Pending Amount</p>
            <span className="stat-count">{filteredBills.filter(b => b.status === 'pending').length} bills</span>
          </div>
        </div>
        <div className="stat-card overdue">
          <div className="stat-icon">
            <AlertTriangle />
          </div>
          <div className="stat-content">
            <h3>${stats.overdueAmount.toLocaleString()}</h3>
            <p>Overdue Amount</p>
            <span className="stat-count">{filteredBills.filter(b => b.status === 'overdue').length} bills</span>
          </div>
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 size={16} />
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'bills' ? 'active' : ''}`}
          onClick={() => setActiveTab('bills')}
        >
          <Receipt size={16} />
          Bills
        </button>
        <button 
          className={`tab-btn ${activeTab === 'issues' ? 'active' : ''}`}
          onClick={() => setActiveTab('issues')}
        >
          <AlertCircle size={16} />
          Issues ({billIssues.filter(i => i.status === 'open').length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <TrendingUp size={16} />
          Analytics
        </button>
      </div>

      {/* Enhanced Controls */}
      <div className="bill-controls">
        <div className="controls-left">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search bills, patients, or bill numbers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="partially_paid">Partially Paid</option>
            </select>
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="consultation">Consultation</option>
              <option value="procedure">Procedure</option>
              <option value="emergency">Emergency</option>
              <option value="surgery">Surgery</option>
            </select>
            <button 
              className={`btn-secondary ${showAdvancedFilters ? 'active' : ''}`}
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <Filter size={16} />
              Advanced
            </button>
          </div>
        </div>
        <div className="controls-right">
          <div className="sort-controls">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="patient">Sort by Patient</option>
              <option value="status">Sort by Status</option>
            </select>
            <button 
              className="btn-icon"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              <ArrowUpDown size={16} />
            </button>
          </div>
          <button 
            className={`btn-icon ${refreshing ? 'loading' : ''}`}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="advanced-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label>Date Range</label>
              <div className="date-range">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                />
                <span>to</span>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                />
              </div>
            </div>
            <div className="filter-group">
              <label>Amount Range</label>
              <div className="amount-range">
                <input
                  type="number"
                  placeholder="Min"
                  value={amountRange.min}
                  onChange={(e) => setAmountRange({...amountRange, min: e.target.value})}
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={amountRange.max}
                  onChange={(e) => setAmountRange({...amountRange, max: e.target.value})}
                />
              </div>
            </div>
            <button 
              className="btn-secondary"
              onClick={() => {
                setDateRange({ start: '', end: '' });
                setAmountRange({ min: '', max: '' });
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedBills.length > 0 && (
        <div className="bulk-actions">
          <div className="bulk-info">
            <span>{selectedBills.length} bill(s) selected</span>
          </div>
          <div className="bulk-buttons">
            <button 
              className="btn-secondary"
              onClick={() => handleBulkAction('send_invoice')}
            >
              <Send size={16} />
              Send Invoices
            </button>
            <button 
              className="btn-secondary"
              onClick={() => handleBulkAction('mark_paid')}
            >
              <CheckCircle size={16} />
              Mark as Paid
            </button>
            <button 
              className="btn-secondary"
              onClick={() => handleBulkAction('export')}
            >
              <Download size={16} />
              Export
            </button>
            <button 
              className="btn-secondary"
              onClick={() => handleBulkAction('print')}
            >
              <Printer size={16} />
              Print
            </button>
          </div>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="overview-content">
          <div className="overview-grid">
            <div className="overview-main">
              <div className="chart-section">
                <h3>Revenue Overview</h3>
                <div className="chart-placeholder">
                  <BarChart3 size={48} />
                  <p>Revenue chart would be displayed here</p>
                </div>
              </div>
              <div className="recent-bills">
                <div className="section-header">
                  <h3>Recent Bills</h3>
                  <button 
                    className="btn-link"
                    onClick={() => setActiveTab('bills')}
                  >
                    View All
                  </button>
                </div>
                <div className="bills-list">
                  {filteredBills.slice(0, 5).map(bill => (
                    <div key={bill.id} className={`bill-item ${bill.status}`}>
                      <div className="bill-info">
                        <div className="bill-patient">
                          <span className="patient-name">{bill.patientName}</span>
                          <span className="bill-number">{bill.billNumber}</span>
                        </div>
                        <div className="bill-details">
                          <span className="bill-amount">${bill.amount.toLocaleString()}</span>
                          <span className={`bill-status ${bill.status}`}>
                            {getStatusIcon(bill.status)}
                            {bill.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="overview-sidebar">
              <div className="activity-section">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {billsData.recentActivity.map(activity => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-icon">
                        {activity.type === 'bill_created' && <Plus size={16} />}
                        {activity.type === 'payment_received' && <CheckCircle size={16} />}
                        {activity.type === 'bill_overdue' && <AlertTriangle size={16} />}
                      </div>
                      <div className="activity-content">
                        <p>{activity.description}</p>
                        <span className="activity-time">
                          {activity.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bills' && (
        <div className="bills-content">
          <div className="bills-table-container">
            <table className="bills-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Bill Details</th>
                  <th>Patient</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBills.map(bill => (
                  <tr key={bill.id} className={getStatusClass(bill.status)}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedBills.includes(bill.id)}
                        onChange={() => handleSelectBill(bill.id)}
                      />
                    </td>
                    <td>
                      <div className="bill-details-cell">
                        <div className="bill-number">{bill.billNumber}</div>
                        <div className="bill-id">{bill.id}</div>
                        <div className="bill-date">{bill.issueDate}</div>
                      </div>
                    </td>
                    <td>
                      <div className="patient-cell">
                        <div className="patient-name">{bill.patientName}</div>
                        <div className="patient-id">{bill.patientId}</div>
                        <div className="doctor-name">{bill.doctor}</div>
                      </div>
                    </td>
                    <td>
                      <div className="amount-cell">
                        <div className="amount">${bill.amount.toLocaleString()}</div>
                        {bill.paidAmount && (
                          <div className="paid-amount">
                            Paid: ${bill.paidAmount.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${bill.status}`}>
                        {getStatusIcon(bill.status)}
                        {bill.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td>
                      <div className="type-cell">
                        {getTypeIcon(bill.type)}
                        <span>{bill.type}</span>
                      </div>
                    </td>
                    <td>
                      <div className="date-cell">
                        <div className="due-date">{bill.dueDate}</div>
                        {new Date(bill.dueDate) < new Date() && bill.status !== 'paid' && (
                          <div className="overdue-indicator">Overdue</div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button 
                          className="btn-icon"
                          onClick={() => handleViewBill(bill)}
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="btn-icon"
                          onClick={() => handleEditBill(bill)}
                          title="Edit Bill"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="btn-icon"
                          onClick={() => handlePrintBill(bill)}
                          title="Print"
                        >
                          <Printer size={16} />
                        </button>
                        <button 
                          className="btn-icon"
                          onClick={() => handleSendInvoice(bill)}
                          title="Send Invoice"
                        >
                          <Send size={16} />
                        </button>
                        <button 
                          className="btn-icon danger"
                          onClick={() => handleDeleteBill(bill)}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'issues' && (
        <div className="issues-content">
          <div className="issues-header">
            <h3>Bill Issues & Disputes</h3>
            <button className="btn-primary">
              <Plus size={16} />
              Report Issue
            </button>
          </div>
          <div className="issues-list">
            {billIssues.map(issue => (
              <div key={issue.id} className={`issue-card ${issue.status}`}>
                <div className="issue-header">
                  <div className="issue-title">
                    <h4>{issue.issue}</h4>
                    <span className={`priority-badge ${issue.priority}`}>
                      {issue.priority}
                    </span>
                  </div>
                  <div className="issue-status">
                    <span className={`status-badge ${issue.status}`}>
                      {issue.status}
                    </span>
                  </div>
                </div>
                <div className="issue-content">
                  <p>{issue.description}</p>
                  <div className="issue-meta">
                    <span>Patient: {issue.patientName}</span>
                    <span>Bill: {issue.billId}</span>
                    <span>Assigned to: {issue.assignedTo}</span>
                    <span>Created: {issue.createdDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="analytics-content">
          <div className="analytics-grid">
            <div className="analytics-card">
              <h3>Payment Trends</h3>
              <div className="chart-placeholder">
                <TrendingUp size={48} />
                <p>Payment trends chart</p>
              </div>
            </div>
            <div className="analytics-card">
              <h3>Department Revenue</h3>
              <div className="chart-placeholder">
                <BarChart3 size={48} />
                <p>Department revenue chart</p>
              </div>
            </div>
            <div className="analytics-card">
              <h3>Collection Rate</h3>
              <div className="metric-display">
                <div className="metric-value">{stats.paymentRate.toFixed(1)}%</div>
                <div className="metric-label">Overall Collection Rate</div>
              </div>
            </div>
            <div className="analytics-card">
              <h3>Average Bill Amount</h3>
              <div className="metric-display">
                <div className="metric-value">${billsData.summary.avgBillAmount}</div>
                <div className="metric-label">Average per Bill</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showAddBillModal && (
        <AddBillModal
          isOpen={showAddBillModal}
          onClose={() => setShowAddBillModal(false)}
          onSave={(billData) => {
            // Handle save logic here
            setShowAddBillModal(false);
          }}
          patients={mockPatients}
          templates={billsData.templates}
        />
      )}

      {showEditBillModal && editingBill && (
        <EditBillModal
          isOpen={showEditBillModal}
          onClose={() => {
            setShowEditBillModal(false);
            setEditingBill(null);
          }}
          onSave={(updatedBill) => {
            // Handle update logic here
            setShowEditBillModal(false);
            setEditingBill(null);
          }}
          bill={editingBill}
          patients={mockPatients}
        />
      )}

      {/* Bill Details Modal */}
      {showBillDetailsModal && selectedBill && (
        <div className="modal-overlay" onClick={() => setShowBillDetailsModal(false)}>
          <div className="modal-content bill-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Bill Details</h2>
              <button 
                className="btn-icon"
                onClick={() => setShowBillDetailsModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="bill-details-grid">
                <div className="bill-info-section">
                  <h3>Bill Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Bill Number:</label>
                      <span>{selectedBill.billNumber}</span>
                    </div>
                    <div className="info-item">
                      <label>Issue Date:</label>
                      <span>{selectedBill.issueDate}</span>
                    </div>
                    <div className="info-item">
                      <label>Due Date:</label>
                      <span>{selectedBill.dueDate}</span>
                    </div>
                    <div className="info-item">
                      <label>Status:</label>
                      <span className={`status-badge ${selectedBill.status}`}>
                        {selectedBill.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="patient-info-section">
                  <h3>Patient Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Name:</label>
                      <span>{selectedBill.patient.name}</span>
                    </div>
                    <div className="info-item">
                      <label>Email:</label>
                      <span>{selectedBill.patient.email}</span>
                    </div>
                    <div className="info-item">
                      <label>Phone:</label>
                      <span>{selectedBill.patient.phone}</span>
                    </div>
                    <div className="info-item">
                      <label>Insurance:</label>
                      <span>{selectedBill.patient.insurance}</span>
                    </div>
                  </div>
                </div>

                <div className="services-section">
                  <h3>Services</h3>
                  <table className="services-table">
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th>Code</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBill.services.map((service, index) => (
                        <tr key={index}>
                          <td>{service.name}</td>
                          <td>{service.code}</td>
                          <td>{service.quantity}</td>
                          <td>${service.rate.toFixed(2)}</td>
                          <td>${service.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="bill-totals">
                    <div className="total-row">
                      <span>Subtotal:</span>
                      <span>${selectedBill.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="total-row">
                      <span>Tax:</span>
                      <span>${selectedBill.tax.toFixed(2)}</span>
                    </div>
                    {selectedBill.discount > 0 && (
                      <div className="total-row">
                        <span>Discount:</span>
                        <span>-${selectedBill.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="total-row final">
                      <span>Total:</span>
                      <span>${selectedBill.amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => handlePrintBill(selectedBill)}
              >
                <Printer size={16} />
                Print
              </button>
              <button 
                className="btn-secondary"
                onClick={() => handleSendInvoice(selectedBill)}
              >
                <Send size={16} />
                Send Invoice
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  setShowBillDetailsModal(false);
                  handleEditBill(selectedBill);
                }}
              >
                <Edit size={16} />
                Edit Bill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {confirmAction && (
        <div className="modal-overlay">
          <div className="modal-content confirmation-modal">
            <div className="modal-header">
              <h3>Confirm Action</h3>
            </div>
            <div className="modal-body">
              <p>{confirmAction.message}</p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setConfirmAction(null)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  // Handle the confirmed action
                  setConfirmAction(null);
                  setSelectedBills([]);
                  setSelectAll(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

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
};

export default BillManagement;