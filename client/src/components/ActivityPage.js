import React, { useState, useEffect } from 'react';
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
  Settings,
  Shield,
  Database,
  Server,
  Monitor,
  Wifi,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Lock,
  Unlock,
  LogIn,
  LogOut,
  UserCheck,
  UserX,
  FileCheck,
  FileX,
  Bell,
  BellOff,
  Mail,
  Phone,
  MessageSquare,
  CreditCard,
  DollarSign,
  Receipt,
  Package,
  Truck,
  MapPin,
  Home,
  Building,
  Users,
  UserMinus,
  Plus,
  Minus,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  ExternalLink,
  Copy,
  Share2,
  Bookmark,
  Flag,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Archive,
  Folder,
  FolderOpen,
  File,
  Image,
  Video,
  Music,
  Paperclip,
  Link,
  Globe,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Printer,
  Scanner,
  Camera,
  Mic,
  Speaker,
  Headphones,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Stop,
  SkipForward,
  SkipBack,
  FastForward,
  Rewind,
  Repeat,
  Shuffle,
  Radio,
  Tv,
  Gamepad2,
  Joystick,
  Zap,
  Battery,
  BatteryLow,
  Plug,
  Power,
  PowerOff
} from 'lucide-react';
import './ActivityPage.css';

const ActivityPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');
  const [userFilter, setUserFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('timeline');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Enhanced activity data with more comprehensive monitoring
  const activities = [
    {
      id: 1,
      type: 'patient_added',
      title: 'New Patient Registration',
      description: 'Sarah Johnson was registered as a new patient',
      user: {
        id: 'U001',
        name: 'Emily Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1594824388853-d0c2d4e5b5e5?w=40&h=40&fit=crop&crop=face',
        role: 'Receptionist',
        department: 'Front Desk'
      },
      timestamp: '2024-01-15T10:30:00Z',
      category: 'patient',
      severity: 'info',
      ipAddress: '192.168.1.105',
      userAgent: 'Chrome/120.0.0.0',
      sessionId: 'SES-001',
      location: 'Reception Desk 1',
      details: {
        patientId: 'P-001',
        patientName: 'Sarah Johnson',
        registrationMethod: 'Walk-in',
        insuranceProvider: 'Blue Cross',
        emergencyContact: 'John Johnson',
        referralSource: 'Google Search'
      },
      auditTrail: [
        { action: 'Form Started', timestamp: '2024-01-15T10:28:00Z', user: 'Emily Rodriguez' },
        { action: 'Insurance Verified', timestamp: '2024-01-15T10:29:00Z', user: 'System' },
        { action: 'Registration Completed', timestamp: '2024-01-15T10:30:00Z', user: 'Emily Rodriguez' }
      ]
    },
    {
      id: 2,
      type: 'appointment_scheduled',
      title: 'Appointment Scheduled',
      description: 'Appointment scheduled for Michael Chen with Dr. Wilson',
      user: {
        id: 'U002',
        name: 'Dr. Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face',
        role: 'Doctor',
        department: 'Cardiology'
      },
      timestamp: '2024-01-15T09:45:00Z',
      category: 'appointment',
      severity: 'success',
      ipAddress: '192.168.1.102',
      userAgent: 'Safari/17.0',
      sessionId: 'SES-002',
      location: 'Office 201',
      details: {
        appointmentId: 'A-001',
        patientId: 'P-002',
        patientName: 'Michael Chen',
        appointmentDate: '2024-01-20',
        appointmentTime: '14:00',
        duration: '30 minutes',
        appointmentType: 'Follow-up',
        notes: 'Routine cardiac checkup'
      },
      auditTrail: [
        { action: 'Slot Selected', timestamp: '2024-01-15T09:43:00Z', user: 'Dr. Sarah Wilson' },
        { action: 'Patient Notified', timestamp: '2024-01-15T09:44:00Z', user: 'System' },
        { action: 'Appointment Confirmed', timestamp: '2024-01-15T09:45:00Z', user: 'Dr. Sarah Wilson' }
      ]
    },
    {
      id: 3,
      type: 'payment_received',
      title: 'Payment Processed',
      description: 'Payment of $250.00 received from Emily Davis',
      user: {
        id: 'SYS001',
        name: 'Payment Gateway',
        avatar: null,
        role: 'System',
        department: 'Billing'
      },
      timestamp: '2024-01-15T08:20:00Z',
      category: 'payment',
      severity: 'success',
      ipAddress: '192.168.1.200',
      userAgent: 'PaymentBot/1.0',
      sessionId: 'SES-003',
      location: 'Payment Server',
      details: {
        invoiceId: 'INV-003',
        patientId: 'P-003',
        patientName: 'Emily Davis',
        amount: 250.00,
        paymentMethod: 'Credit Card',
        transactionId: 'TXN-12345',
        cardLast4: '4532',
        authCode: 'AUTH123',
        processingFee: 7.50
      },
      auditTrail: [
        { action: 'Payment Initiated', timestamp: '2024-01-15T08:18:00Z', user: 'Emily Davis' },
        { action: 'Card Authorized', timestamp: '2024-01-15T08:19:00Z', user: 'Payment Gateway' },
        { action: 'Payment Completed', timestamp: '2024-01-15T08:20:00Z', user: 'Payment Gateway' }
      ]
    },
    {
      id: 4,
      type: 'user_login',
      title: 'User Login',
      description: 'Michael Chen logged into the system',
      user: {
        id: 'U003',
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face',
        role: 'Nurse',
        department: 'Emergency'
      },
      timestamp: '2024-01-15T07:00:00Z',
      category: 'security',
      severity: 'info',
      ipAddress: '192.168.1.110',
      userAgent: 'Chrome/120.0.0.0',
      sessionId: 'SES-004',
      location: 'Nurse Station 3',
      details: {
        loginMethod: 'Password',
        deviceType: 'Desktop',
        operatingSystem: 'Windows 11',
        browser: 'Chrome',
        twoFactorUsed: true,
        previousLogin: '2024-01-14T22:30:00Z'
      },
      auditTrail: [
        { action: 'Login Attempt', timestamp: '2024-01-15T06:59:30Z', user: 'Michael Chen' },
        { action: '2FA Verified', timestamp: '2024-01-15T06:59:45Z', user: 'System' },
        { action: 'Login Successful', timestamp: '2024-01-15T07:00:00Z', user: 'System' }
      ]
    },
    {
      id: 5,
      type: 'record_updated',
      title: 'Patient Record Updated',
      description: 'Medical record updated for Robert Wilson',
      user: {
        id: 'U004',
        name: 'Dr. Robert Kim',
        avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=40&h=40&fit=crop&crop=face',
        role: 'Doctor',
        department: 'Internal Medicine'
      },
      timestamp: '2024-01-14T16:30:00Z',
      category: 'medical',
      severity: 'warning',
      ipAddress: '192.168.1.103',
      userAgent: 'Firefox/121.0',
      sessionId: 'SES-005',
      location: 'Office 305',
      details: {
        patientId: 'P-004',
        patientName: 'Robert Wilson',
        updatedFields: ['diagnosis', 'treatment_plan', 'medications'],
        recordType: 'Medical History',
        previousValues: {
          diagnosis: 'Hypertension',
          treatment_plan: 'Medication only',
          medications: 'Lisinopril 10mg'
        },
        newValues: {
          diagnosis: 'Hypertension, Type 2 Diabetes',
          treatment_plan: 'Medication + Lifestyle changes',
          medications: 'Lisinopril 10mg, Metformin 500mg'
        }
      },
      auditTrail: [
        { action: 'Record Accessed', timestamp: '2024-01-14T16:25:00Z', user: 'Dr. Robert Kim' },
        { action: 'Diagnosis Updated', timestamp: '2024-01-14T16:28:00Z', user: 'Dr. Robert Kim' },
        { action: 'Treatment Plan Modified', timestamp: '2024-01-14T16:29:00Z', user: 'Dr. Robert Kim' },
        { action: 'Changes Saved', timestamp: '2024-01-14T16:30:00Z', user: 'Dr. Robert Kim' }
      ]
    },
    {
      id: 6,
      type: 'system_backup',
      title: 'System Backup Completed',
      description: 'Daily system backup completed successfully',
      user: {
        id: 'SYS002',
        name: 'Backup Service',
        avatar: null,
        role: 'System',
        department: 'IT'
      },
      timestamp: '2024-01-14T02:00:00Z',
      category: 'system',
      severity: 'success',
      ipAddress: '192.168.1.250',
      userAgent: 'BackupBot/2.1',
      sessionId: 'SYS-BACKUP-001',
      location: 'Data Center',
      details: {
        backupSize: '2.4 GB',
        backupLocation: 'AWS S3 Bucket',
        duration: '45 minutes',
        filesBackedUp: 15420,
        compressionRatio: '65%',
        encryptionUsed: 'AES-256',
        verificationStatus: 'Passed'
      },
      auditTrail: [
        { action: 'Backup Started', timestamp: '2024-01-14T01:15:00Z', user: 'Backup Service' },
        { action: 'Database Backup', timestamp: '2024-01-14T01:30:00Z', user: 'Backup Service' },
        { action: 'File Backup', timestamp: '2024-01-14T01:45:00Z', user: 'Backup Service' },
        { action: 'Verification Complete', timestamp: '2024-01-14T02:00:00Z', user: 'Backup Service' }
      ]
    },
    {
      id: 7,
      type: 'security_alert',
      title: 'Failed Login Attempt',
      description: 'Multiple failed login attempts detected for admin account',
      user: {
        id: 'SYS003',
        name: 'Security Monitor',
        avatar: null,
        role: 'System',
        department: 'Security'
      },
      timestamp: '2024-01-15T03:15:00Z',
      category: 'security',
      severity: 'error',
      ipAddress: '203.0.113.45',
      userAgent: 'Unknown',
      sessionId: 'SEC-ALERT-001',
      location: 'External',
      details: {
        targetAccount: 'admin',
        attemptCount: 5,
        sourceIP: '203.0.113.45',
        sourceCountry: 'Unknown',
        timeWindow: '5 minutes',
        accountLocked: true,
        notificationSent: true
      },
      auditTrail: [
        { action: 'First Failed Attempt', timestamp: '2024-01-15T03:10:00Z', user: 'Unknown' },
        { action: 'Multiple Attempts Detected', timestamp: '2024-01-15T03:13:00Z', user: 'Security Monitor' },
        { action: 'Account Locked', timestamp: '2024-01-15T03:14:00Z', user: 'Security Monitor' },
        { action: 'Admin Notified', timestamp: '2024-01-15T03:15:00Z', user: 'Security Monitor' }
      ]
    },
    {
      id: 8,
      type: 'system_performance',
      title: 'High CPU Usage Alert',
      description: 'Server CPU usage exceeded 85% threshold',
      user: {
        id: 'SYS004',
        name: 'Performance Monitor',
        avatar: null,
        role: 'System',
        department: 'IT'
      },
      timestamp: '2024-01-15T11:45:00Z',
      category: 'system',
      severity: 'warning',
      ipAddress: '192.168.1.251',
      userAgent: 'MonitorBot/3.0',
      sessionId: 'PERF-ALERT-001',
      location: 'Server Room',
      details: {
        serverName: 'CLINIC-WEB-01',
        cpuUsage: '87%',
        memoryUsage: '72%',
        diskUsage: '45%',
        activeConnections: 245,
        responseTime: '2.3s',
        threshold: '85%',
        duration: '10 minutes'
      },
      auditTrail: [
        { action: 'Threshold Exceeded', timestamp: '2024-01-15T11:35:00Z', user: 'Performance Monitor' },
        { action: 'Alert Generated', timestamp: '2024-01-15T11:40:00Z', user: 'Performance Monitor' },
        { action: 'IT Team Notified', timestamp: '2024-01-15T11:45:00Z', user: 'Performance Monitor' }
      ]
    },
    {
      id: 9,
      type: 'data_export',
      title: 'Patient Data Export',
      description: 'Patient data exported for insurance claim processing',
      user: {
        id: 'U005',
        name: 'Lisa Thompson',
        avatar: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=40&h=40&fit=crop&crop=face',
        role: 'Billing Specialist',
        department: 'Billing'
      },
      timestamp: '2024-01-15T14:20:00Z',
      category: 'data',
      severity: 'info',
      ipAddress: '192.168.1.115',
      userAgent: 'Chrome/120.0.0.0',
      sessionId: 'SES-006',
      location: 'Billing Office',
      details: {
        exportType: 'Insurance Claims',
        recordCount: 45,
        dateRange: '2024-01-01 to 2024-01-15',
        fileFormat: 'CSV',
        fileSize: '2.1 MB',
        encryptionUsed: true,
        approvalRequired: true,
        approvedBy: 'Manager'
      },
      auditTrail: [
        { action: 'Export Requested', timestamp: '2024-01-15T14:15:00Z', user: 'Lisa Thompson' },
        { action: 'Manager Approval', timestamp: '2024-01-15T14:18:00Z', user: 'John Manager' },
        { action: 'Data Exported', timestamp: '2024-01-15T14:20:00Z', user: 'Lisa Thompson' }
      ]
    },
    {
      id: 10,
      type: 'medication_alert',
      title: 'Drug Interaction Alert',
      description: 'Potential drug interaction detected for patient prescription',
      user: {
        id: 'SYS005',
        name: 'Clinical Decision Support',
        avatar: null,
        role: 'System',
        department: 'Clinical'
      },
      timestamp: '2024-01-15T13:30:00Z',
      category: 'clinical',
      severity: 'error',
      ipAddress: '192.168.1.252',
      userAgent: 'ClinicalBot/1.5',
      sessionId: 'CLIN-ALERT-001',
      location: 'Clinical System',
      details: {
        patientId: 'P-005',
        patientName: 'Margaret Brown',
        prescribingDoctor: 'Dr. James Miller',
        newMedication: 'Warfarin 5mg',
        conflictingMedication: 'Aspirin 81mg',
        interactionLevel: 'Major',
        recommendation: 'Consider alternative anticoagulant',
        overrideRequired: true
      },
      auditTrail: [
        { action: 'Prescription Entered', timestamp: '2024-01-15T13:28:00Z', user: 'Dr. James Miller' },
        { action: 'Interaction Detected', timestamp: '2024-01-15T13:29:00Z', user: 'Clinical Decision Support' },
        { action: 'Alert Generated', timestamp: '2024-01-15T13:30:00Z', user: 'Clinical Decision Support' }
      ]
    }
  ];

  // Enhanced filtering and statistics
  const activityTypes = [
    'all', 'patient_added', 'appointment_scheduled', 'payment_received', 
    'user_login', 'record_updated', 'system_backup', 'security_alert',
    'system_performance', 'data_export', 'medication_alert'
  ];
  
  const dateFilters = [
    'today', 'yesterday', 'this_week', 'last_week', 
    'this_month', 'last_month', 'custom'
  ];
  
  const severityFilters = ['all', 'info', 'success', 'warning', 'error'];
  const categoryFilters = ['all', 'patient', 'appointment', 'payment', 'security', 'system', 'medical', 'data', 'clinical'];
  const users = ['all', ...new Set(activities.map(a => a.user.name))];

  // Enhanced statistics with real-time monitoring
  const stats = [
    {
      title: 'Total Activities',
      value: activities.length.toString(),
      change: '+12',
      changeType: 'increase',
      icon: Activity,
      color: '#10b981',
      description: 'Last 24 hours'
    },
    {
      title: 'User Actions',
      value: activities.filter(a => a.category !== 'system').length.toString(),
      change: '+8',
      changeType: 'increase',
      icon: User,
      color: '#3b82f6',
      description: 'Human interactions'
    },
    {
      title: 'System Events',
      value: activities.filter(a => a.category === 'system').length.toString(),
      change: '+4',
      changeType: 'increase',
      icon: Settings,
      color: '#8b5cf6',
      description: 'Automated processes'
    },
    {
      title: 'Security Alerts',
      value: activities.filter(a => a.severity === 'error').length.toString(),
      change: '-1',
      changeType: 'decrease',
      icon: Shield,
      color: '#ef4444',
      description: 'Critical issues'
    },
    {
      title: 'Performance',
      value: '98.5%',
      change: '+0.2%',
      changeType: 'increase',
      icon: TrendingUp,
      color: '#10b981',
      description: 'System uptime'
    },
    {
      title: 'Data Volume',
      value: '2.4 GB',
      change: '+150 MB',
      changeType: 'increase',
      icon: Database,
      color: '#f59e0b',
      description: 'Daily processing'
    }
  ];

  // System monitoring metrics
  const systemMetrics = {
    server: {
      cpu: 45,
      memory: 68,
      disk: 32,
      network: 15
    },
    database: {
      connections: 23,
      queries: 1250,
      responseTime: 1.2,
      cacheHit: 94
    },
    security: {
      activeUsers: 15,
      failedLogins: 2,
      blockedIPs: 5,
      lastScan: '2024-01-15T12:00:00Z'
    }
  };

  // Recent activity summary
  const recentActivity = [
    { type: 'login', count: 15, trend: 'up' },
    { type: 'appointments', count: 8, trend: 'up' },
    { type: 'payments', count: 12, trend: 'down' },
    { type: 'alerts', count: 3, trend: 'stable' }
  ];

  // Auto-refresh functionality
  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        handleRefresh();
      }, refreshInterval * 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, refreshInterval]);

  // Enhanced filtering logic
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.details?.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.ipAddress?.includes(searchTerm);
    
    const matchesType = typeFilter === 'all' || activity.type === typeFilter;
    const matchesUser = userFilter === 'all' || activity.user.name === userFilter;
    const matchesSeverity = severityFilter === 'all' || activity.severity === severityFilter;
    const matchesCategory = categoryFilter === 'all' || activity.category === categoryFilter;
    
    // Enhanced date filtering
    const activityDate = new Date(activity.timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    let matchesDate = true;
    switch (dateFilter) {
      case 'today':
        matchesDate = activityDate.toDateString() === today.toDateString();
        break;
      case 'yesterday':
        matchesDate = activityDate.toDateString() === yesterday.toDateString();
        break;
      case 'this_week':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        matchesDate = activityDate >= weekStart;
        break;
      case 'this_month':
        matchesDate = activityDate.getMonth() === today.getMonth() && 
                     activityDate.getFullYear() === today.getFullYear();
        break;
      default:
        matchesDate = true;
    }
    
    return matchesSearch && matchesType && matchesUser && matchesSeverity && matchesCategory && matchesDate;
  });

  // Sorting logic
  const sortedActivities = [...filteredActivities].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'timestamp':
        aValue = new Date(a.timestamp);
        bValue = new Date(b.timestamp);
        break;
      case 'user':
        aValue = a.user.name;
        bValue = b.user.name;
        break;
      case 'type':
        aValue = a.type;
        bValue = b.type;
        break;
      case 'severity':
        const severityOrder = { info: 1, success: 2, warning: 3, error: 4 };
        aValue = severityOrder[a.severity];
        bValue = severityOrder[b.severity];
        break;
      default:
        aValue = a[sortBy];
        bValue = b[sortBy];
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Event handlers
  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    const dataToExport = sortedActivities.map(activity => ({
      timestamp: activity.timestamp,
      type: activity.type,
      title: activity.title,
      user: activity.user.name,
      category: activity.category,
      severity: activity.severity,
      ipAddress: activity.ipAddress
    }));
    
    const csvContent = "data:text/csv;charset=utf-8," + 
      Object.keys(dataToExport[0]).join(",") + "\n" +
      dataToExport.map(row => Object.values(row).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `activity_log_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'export':
        handleExport();
        break;
      case 'archive':
        console.log('Archiving activities:', selectedActivities);
        break;
      case 'delete':
        console.log('Deleting activities:', selectedActivities);
        break;
    }
    setSelectedActivities([]);
    setShowBulkActions(false);
  };

  const handleSelectAll = () => {
    if (selectedActivities.length === sortedActivities.length) {
      setSelectedActivities([]);
    } else {
      setSelectedActivities(sortedActivities.map(a => a.id));
    }
  };

  const handleSelectActivity = (activityId) => {
    setSelectedActivities(prev => 
      prev.includes(activityId) 
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  // Utility functions
  const getActivityIcon = (type) => {
    const iconMap = {
      patient_added: UserPlus,
      appointment_scheduled: Calendar,
      payment_received: CreditCard,
      user_login: LogIn,
      record_updated: FileCheck,
      system_backup: Archive,
      security_alert: Shield,
      system_performance: Monitor,
      data_export: Download,
      medication_alert: AlertCircle
    };
    
    const IconComponent = iconMap[type] || Activity;
    return <IconComponent size={16} />;
  };

  const getSeverityColor = (severity) => {
    const colors = {
      info: '#3b82f6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    };
    return colors[severity] || '#6b7280';
  };

  const getSeverityIcon = (severity) => {
    const icons = {
      info: Info,
      success: CheckCircle,
      warning: AlertCircle,
      error: X
    };
    const IconComponent = icons[severity] || Info;
    return <IconComponent size={14} />;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  const formatDuration = (start, end) => {
    const duration = new Date(end) - new Date(start);
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const getMetricColor = (value, type) => {
    if (type === 'cpu' || type === 'memory' || type === 'disk') {
      if (value > 80) return '#ef4444';
      if (value > 60) return '#f59e0b';
      return '#10b981';
    }
    return '#3b82f6';
  };

  return (
    <div className="activity-page">
      <div className="activity-header">
        <div className="header-left">
          <h1>Activity Log & System Monitor</h1>
          <p className="page-subtitle">Comprehensive activity monitoring, audit trails, and system performance</p>
        </div>
        <div className="header-actions">
          <div className="auto-refresh-toggle">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
            <span>Auto-refresh</span>
            {autoRefresh && (
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className="refresh-interval"
              >
                <option value={10}>10s</option>
                <option value={30}>30s</option>
                <option value={60}>1m</option>
                <option value={300}>5m</option>
              </select>
            )}
          </div>
          <button 
            className={`btn btn-outline ${isLoading ? 'loading' : ''}`}
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? 'spinning' : ''} />
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
          <button className="btn btn-outline" onClick={handleExport}>
            <Download size={16} />
            Export Log
          </button>
          <button className="btn btn-primary" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={16} />
            Advanced Filters
          </button>
        </div>
      </div>

      {/* Enhanced Statistics Dashboard */}
      <div className="activity-stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card enhanced">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              <stat.icon size={20} />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
              <div className="stat-meta">
                <span className={`stat-change ${stat.changeType}`}>
                  {stat.changeType === 'increase' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {stat.change}
                </span>
                <span className="stat-description">{stat.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* System Monitoring Dashboard */}
      <div className="system-monitoring">
        <div className="monitoring-section">
          <h3>System Performance</h3>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-header">
                <Cpu size={16} />
                <span>CPU Usage</span>
              </div>
              <div className="metric-value">
                <span className="value">{systemMetrics.server.cpu}%</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${systemMetrics.server.cpu}%`,
                      backgroundColor: getMetricColor(systemMetrics.server.cpu, 'cpu')
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <MemoryStick size={16} />
                <span>Memory</span>
              </div>
              <div className="metric-value">
                <span className="value">{systemMetrics.server.memory}%</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${systemMetrics.server.memory}%`,
                      backgroundColor: getMetricColor(systemMetrics.server.memory, 'memory')
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <HardDrive size={16} />
                <span>Disk Usage</span>
              </div>
              <div className="metric-value">
                <span className="value">{systemMetrics.server.disk}%</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${systemMetrics.server.disk}%`,
                      backgroundColor: getMetricColor(systemMetrics.server.disk, 'disk')
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <Network size={16} />
                <span>Network</span>
              </div>
              <div className="metric-value">
                <span className="value">{systemMetrics.server.network} MB/s</span>
                <div className="network-indicator active">
                  <div className="pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="monitoring-section">
          <h3>Database Performance</h3>
          <div className="db-metrics">
            <div className="db-metric">
              <Database size={16} />
              <div className="db-info">
                <span className="db-label">Active Connections</span>
                <span className="db-value">{systemMetrics.database.connections}</span>
              </div>
            </div>
            <div className="db-metric">
              <Activity size={16} />
              <div className="db-info">
                <span className="db-label">Queries/min</span>
                <span className="db-value">{systemMetrics.database.queries}</span>
              </div>
            </div>
            <div className="db-metric">
              <Clock size={16} />
              <div className="db-info">
                <span className="db-label">Response Time</span>
                <span className="db-value">{systemMetrics.database.responseTime}ms</span>
              </div>
            </div>
            <div className="db-metric">
              <TrendingUp size={16} />
              <div className="db-info">
                <span className="db-label">Cache Hit Rate</span>
                <span className="db-value">{systemMetrics.database.cacheHit}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="monitoring-section">
          <h3>Security Status</h3>
          <div className="security-metrics">
            <div className="security-item">
              <Shield size={16} className="security-icon active" />
              <div className="security-info">
                <span className="security-label">Active Users</span>
                <span className="security-value">{systemMetrics.security.activeUsers}</span>
              </div>
            </div>
            <div className="security-item">
              <AlertCircle size={16} className="security-icon warning" />
              <div className="security-info">
                <span className="security-label">Failed Logins</span>
                <span className="security-value">{systemMetrics.security.failedLogins}</span>
              </div>
            </div>
            <div className="security-item">
              <Lock size={16} className="security-icon error" />
              <div className="security-info">
                <span className="security-label">Blocked IPs</span>
                <span className="security-value">{systemMetrics.security.blockedIPs}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="advanced-filters">
          <div className="filters-header">
            <h3>Advanced Filters</h3>
            <button className="close-filters" onClick={() => setShowFilters(false)}>
              <X size={16} />
            </button>
          </div>
          <div className="filters-grid">
            <div className="filter-group">
              <label>Activity Type</label>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="all">All Types</option>
                {activityTypes.slice(1).map(type => (
                  <option key={type} value={type}>
                    {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Severity Level</label>
              <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)}>
                <option value="all">All Severities</option>
                {severityFilters.slice(1).map(severity => (
                  <option key={severity} value={severity}>
                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Category</label>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="all">All Categories</option>
                {categoryFilters.slice(1).map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Date Range</label>
              <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
                {dateFilters.map(filter => (
                  <option key={filter} value={filter}>
                    {filter.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>User</label>
              <select value={userFilter} onChange={(e) => setUserFilter(e.target.value)}>
                <option value="all">All Users</option>
                {users.slice(1).map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="timestamp">Timestamp</option>
                <option value="user">User</option>
                <option value="type">Type</option>
                <option value="severity">Severity</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Sort Order</label>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>

            <div className="filter-group">
              <label>View Mode</label>
              <div className="view-toggle">
                <button 
                  className={`view-btn ${viewMode === 'timeline' ? 'active' : ''}`}
                  onClick={() => setViewMode('timeline')}
                >
                  <Activity size={16} />
                  Timeline
                </button>
                <button 
                  className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setViewMode('table')}
                >
                  <FileText size={16} />
                  Table
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Basic Controls */}
      <div className="activity-controls">
        <div className="search-filter">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search activities, users, IPs, or patient names..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="control-actions">
          {selectedActivities.length > 0 && (
            <div className="bulk-actions">
              <span className="selected-count">{selectedActivities.length} selected</span>
              <button className="btn btn-sm" onClick={() => handleBulkAction('export')}>
                <Download size={14} />
                Export Selected
              </button>
              <button className="btn btn-sm" onClick={() => handleBulkAction('archive')}>
                <Archive size={14} />
                Archive
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => handleBulkAction('delete')}>
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
          
          <div className="results-info">
            Showing {sortedActivities.length} of {activities.length} activities
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="activity-content">
        {viewMode === 'timeline' ? (
          <div className="activity-timeline">
            <div className="timeline-header">
              <h3 className="timeline-title">Activity Timeline</h3>
              <button className="select-all-btn" onClick={handleSelectAll}>
                {selectedActivities.length === sortedActivities.length ? (
                  <>
                    <Check size={16} />
                    Deselect All
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    Select All
                  </>
                )}
              </button>
            </div>
            
            <div className="timeline-list">
              {sortedActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className={`activity-item ${selectedActivities.includes(activity.id) ? 'selected' : ''}`}
                >
                  <div className="activity-selector">
                    <input
                      type="checkbox"
                      checked={selectedActivities.includes(activity.id)}
                      onChange={() => handleSelectActivity(activity.id)}
                    />
                  </div>

                  <div className="activity-icon" style={{ 
                    backgroundColor: `${getSeverityColor(activity.severity)}20`, 
                    color: getSeverityColor(activity.severity) 
                  }}>
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  <div className="activity-content-main">
                    <div className="activity-header">
                      <div className="activity-info">
                        <h4 className="activity-title">{activity.title}</h4>
                        <p className="activity-description">{activity.description}</p>
                      </div>
                      <div className="activity-meta">
                        <div className="severity-badge" style={{ backgroundColor: getSeverityColor(activity.severity) }}>
                          {getSeverityIcon(activity.severity)}
                          {activity.severity}
                        </div>
                        <span className="activity-time">{formatTimestamp(activity.timestamp)}</span>
                        <span className={`activity-category ${activity.category}`}>
                          {activity.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="activity-details-row">
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
                          <span className="user-role">{activity.user.role} • {activity.user.department}</span>
                        </div>
                      </div>

                      <div className="activity-technical">
                        <div className="tech-info">
                          <MapPin size={12} />
                          <span>{activity.location}</span>
                        </div>
                        <div className="tech-info">
                          <Globe size={12} />
                          <span>{activity.ipAddress}</span>
                        </div>
                        <div className="tech-info">
                          <Monitor size={12} />
                          <span>{activity.sessionId}</span>
                        </div>
                      </div>
                    </div>
                    
                    {activity.details && (
                      <div className="activity-actions">
                        <button 
                          className="details-toggle"
                          onClick={() => setSelectedActivity(selectedActivity === activity.id ? null : activity.id)}
                        >
                          <Eye size={14} />
                          {selectedActivity === activity.id ? 'Hide Details' : 'View Details'}
                        </button>
                        <button className="audit-trail-btn">
                          <FileText size={14} />
                          Audit Trail ({activity.auditTrail?.length || 0})
                        </button>
                      </div>
                    )}

                    {selectedActivity === activity.id && activity.details && (
                      <div className="activity-expanded">
                        <div className="details-section">
                          <h5>Activity Details</h5>
                          <div className="details-grid">
                            {Object.entries(activity.details).map(([key, value]) => (
                              <div key={key} className="detail-item">
                                <span className="detail-label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                                <span className="detail-value">
                                  {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {activity.auditTrail && (
                          <div className="audit-section">
                            <h5>Audit Trail</h5>
                            <div className="audit-timeline">
                              {activity.auditTrail.map((audit, index) => (
                                <div key={index} className="audit-item">
                                  <div className="audit-time">{formatTimestamp(audit.timestamp)}</div>
                                  <div className="audit-action">{audit.action}</div>
                                  <div className="audit-user">{audit.user}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="activity-table">
            <table>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedActivities.length === sortedActivities.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>User</th>
                  <th>Category</th>
                  <th>Severity</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedActivities.map((activity) => (
                  <tr key={activity.id} className={selectedActivities.includes(activity.id) ? 'selected' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedActivities.includes(activity.id)}
                        onChange={() => handleSelectActivity(activity.id)}
                      />
                    </td>
                    <td>{formatTimestamp(activity.timestamp)}</td>
                    <td>
                      <div className="type-cell">
                        {getActivityIcon(activity.type)}
                        {activity.type.replace(/_/g, ' ')}
                      </div>
                    </td>
                    <td>{activity.title}</td>
                    <td>
                      <div className="user-cell">
                        {activity.user.avatar ? (
                          <img src={activity.user.avatar} alt={activity.user.name} className="user-avatar-sm" />
                        ) : (
                          <div className="system-avatar-sm">
                            <Settings size={12} />
                          </div>
                        )}
                        {activity.user.name}
                      </div>
                    </td>
                    <td>
                      <span className={`category-badge ${activity.category}`}>
                        {activity.category}
                      </span>
                    </td>
                    <td>
                      <div className="severity-cell" style={{ color: getSeverityColor(activity.severity) }}>
                        {getSeverityIcon(activity.severity)}
                        {activity.severity}
                      </div>
                    </td>
                    <td>{activity.location}</td>
                    <td>
                      <div className="table-actions">
                        <button className="action-btn" title="View Details">
                          <Eye size={14} />
                        </button>
                        <button className="action-btn" title="Audit Trail">
                          <FileText size={14} />
                        </button>
                        <button className="action-btn" title="More">
                          <MoreVertical size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Sidebar with Analytics and Quick Stats */}
        <div className="activity-sidebar">
          <div className="sidebar-section">
            <h4>Recent Activity Summary</h4>
            <div className="activity-summary-chart">
              {recentActivity.map((item, index) => (
                <div key={index} className="summary-item">
                  <div className="summary-info">
                    <span className="summary-type">{item.type}</span>
                    <span className="summary-count">{item.count}</span>
                  </div>
                  <div className={`trend-indicator ${item.trend}`}>
                    {item.trend === 'up' && <TrendingUp size={12} />}
                    {item.trend === 'down' && <TrendingDown size={12} />}
                    {item.trend === 'stable' && <Minus size={12} />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
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

          <div className="sidebar-section">
            <h4>Quick Actions</h4>
            <div className="quick-actions">
              <button className="action-btn-full" onClick={() => setSeverityFilter('error')}>
                <AlertCircle size={16} />
                View Errors Only
              </button>
              <button className="action-btn-full" onClick={() => setCategoryFilter('security')}>
                <Shield size={16} />
                Security Events
              </button>
              <button className="action-btn-full" onClick={() => setTypeFilter('system_backup')}>
                <Archive size={16} />
                System Backups
              </button>
              <button className="action-btn-full" onClick={() => setCategoryFilter('medical')}>
                <FileCheck size={16} />
                Medical Records
              </button>
            </div>
          </div>

          <div className="sidebar-section">
            <h4>System Health</h4>
            <div className="health-indicators">
              <div className="health-item">
                <div className="health-icon success">
                  <CheckCircle size={16} />
                </div>
                <div className="health-info">
                  <span className="health-label">Database</span>
                  <span className="health-status">Healthy</span>
                </div>
              </div>
              <div className="health-item">
                <div className="health-icon success">
                  <CheckCircle size={16} />
                </div>
                <div className="health-info">
                  <span className="health-label">API Services</span>
                  <span className="health-status">Online</span>
                </div>
              </div>
              <div className="health-item">
                <div className="health-icon warning">
                  <AlertCircle size={16} />
                </div>
                <div className="health-info">
                  <span className="health-label">Storage</span>
                  <span className="health-status">75% Full</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;