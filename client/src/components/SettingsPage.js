import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Palette, 
  Globe, 
  Clock, 
  Save, 
  RefreshCw, 
  Eye, 
  EyeOff,
  Check,
  X,
  Upload,
  Download,
  Trash2,
  Edit,
  Plus,
  AlertTriangle,
  Info,
  Moon,
  Sun
} from 'lucide-react';
import './SettingsPage.css';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Modal states for user management
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    appointments: true,
    payments: true,
    system: false
  });

  const [generalSettings, setGeneralSettings] = useState({
    clinicName: 'Prime Clinic',
    address: '123 Healthcare Ave, Medical City, MC 12345',
    phone: '+1 (555) 123-4567',
    email: 'info@primeclinic.com',
    website: 'www.primeclinic.com',
    timezone: 'America/New_York',
    language: 'en',
    currency: 'USD'
  });

  const [saveStatus, setSaveStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle save functionality
  const handleSave = async () => {
    setIsLoading(true);
    setSaveStatus('saving');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save to localStorage for demo purposes
      localStorage.setItem('clinicSettings', JSON.stringify({
        general: generalSettings,
        notifications,
        darkMode,
        activeTab
      }));
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle reset functionality
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults? This action cannot be undone.')) {
      setGeneralSettings({
        clinicName: 'Prime Clinic',
        address: '123 Healthcare Ave, Medical City, MC 12345',
        phone: '+1 (555) 123-4567',
        email: 'info@primeclinic.com',
        website: 'www.primeclinic.com',
        timezone: 'America/New_York',
        language: 'en',
        currency: 'USD'
      });
      
      setNotifications({
        email: true,
        push: true,
        sms: false,
        appointments: true,
        payments: true,
        system: false
      });
      
      setDarkMode(false);
      setActiveTab('general');
      
      // Clear localStorage
      localStorage.removeItem('clinicSettings');
      
      setSaveStatus('reset');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  // Handle configure button functionality
  const handleConfigure = (service) => {
    alert(`Opening configuration for ${service}...`);
    // In a real app, this would open a modal or navigate to configuration page
  };

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5,
    ipWhitelist: false
  });

  const settingsTabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'users', label: 'Users & Roles', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'backup', label: 'Backup & Data', icon: Database },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Globe }
  ];

  const userRoles = [
    {
      id: 1,
      name: 'Administrator',
      description: 'Full system access and management',
      users: 2,
      permissions: ['all']
    },
    {
      id: 2,
      name: 'Doctor',
      description: 'Patient management and medical records',
      users: 8,
      permissions: ['patients', 'appointments', 'medical_records']
    },
    {
      id: 3,
      name: 'Nurse',
      description: 'Patient care and appointment assistance',
      users: 12,
      permissions: ['patients', 'appointments']
    },
    {
      id: 4,
      name: 'Receptionist',
      description: 'Appointment scheduling and patient registration',
      users: 4,
      permissions: ['appointments', 'patients_basic']
    }
  ];

  const integrations = [
    {
      name: 'Electronic Health Records (EHR)',
      description: 'Sync with external EHR systems',
      status: 'connected',
      lastSync: '2024-01-15 10:30 AM'
    },
    {
      name: 'Payment Gateway',
      description: 'Process online payments',
      status: 'connected',
      lastSync: '2024-01-15 09:45 AM'
    },
    {
      name: 'SMS Service',
      description: 'Send appointment reminders via SMS',
      status: 'disconnected',
      lastSync: 'Never'
    },
    {
      name: 'Email Service',
      description: 'Send notifications and reports',
      status: 'connected',
      lastSync: '2024-01-15 11:15 AM'
    }
  ];

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleGeneralSettingChange = (key, value) => {
    setGeneralSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSecuritySettingChange = (key, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // User management handlers
  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setShowEditRoleModal(true);
  };

  const handleDeleteRole = (role) => {
    setSelectedRole(role);
    setShowDeleteConfirmModal(true);
  };

  const handleCreateNewRole = () => {
    setShowCreateRoleModal(true);
  };

  const closeAllModals = () => {
    setShowAddUserModal(false);
    setShowEditRoleModal(false);
    setShowDeleteConfirmModal(false);
    setShowCreateRoleModal(false);
    setSelectedRole(null);
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    // Handle add user logic here
    alert('User added successfully!');
    closeAllModals();
  };

  const handleEditRoleSubmit = (e) => {
    e.preventDefault();
    // Handle edit role logic here
    alert('Role updated successfully!');
    closeAllModals();
  };

  const handleDeleteConfirm = () => {
    // Handle delete role logic here
    alert(`Role "${selectedRole.name}" deleted successfully!`);
    closeAllModals();
  };

  const handleCreateRoleSubmit = (e) => {
    e.preventDefault();
    // Handle create role logic here
    alert('New role created successfully!');
    closeAllModals();
  };

  const renderGeneralSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>General Settings</h3>
        <p>Configure basic clinic information and preferences</p>
      </div>
      
      <div className="settings-grid">
        <div className="setting-group">
          <label className="setting-label">Clinic Name</label>
          <input
            type="text"
            value={generalSettings.clinicName}
            onChange={(e) => handleGeneralSettingChange('clinicName', e.target.value)}
            className="setting-input"
          />
        </div>
        
        <div className="setting-group">
          <label className="setting-label">Phone Number</label>
          <input
            type="tel"
            value={generalSettings.phone}
            onChange={(e) => handleGeneralSettingChange('phone', e.target.value)}
            className="setting-input"
          />
        </div>
        
        <div className="setting-group full-width">
          <label className="setting-label">Address</label>
          <input
            type="text"
            value={generalSettings.address}
            onChange={(e) => handleGeneralSettingChange('address', e.target.value)}
            className="setting-input"
          />
        </div>
        
        <div className="setting-group">
          <label className="setting-label">Email</label>
          <input
            type="email"
            value={generalSettings.email}
            onChange={(e) => handleGeneralSettingChange('email', e.target.value)}
            className="setting-input"
          />
        </div>
        
        <div className="setting-group">
          <label className="setting-label">Website</label>
          <input
            type="url"
            value={generalSettings.website}
            onChange={(e) => handleGeneralSettingChange('website', e.target.value)}
            className="setting-input"
          />
        </div>
        
        <div className="setting-group">
          <label className="setting-label">Timezone</label>
          <select
            value={generalSettings.timezone}
            onChange={(e) => handleGeneralSettingChange('timezone', e.target.value)}
            className="setting-select"
          >
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </div>
        
        <div className="setting-group">
          <label className="setting-label">Language</label>
          <select
            value={generalSettings.language}
            onChange={(e) => handleGeneralSettingChange('language', e.target.value)}
            className="setting-select"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
        
        <div className="setting-group">
          <label className="setting-label">Currency</label>
          <select
            value={generalSettings.currency}
            onChange={(e) => handleGeneralSettingChange('currency', e.target.value)}
            className="setting-select"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="CAD">CAD (C$)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderUsersSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Users & Roles</h3>
        <p>Manage user accounts and role permissions</p>
        <button className="btn btn-primary" onClick={handleAddUser}>
          <Plus size={16} />
          Add User
        </button>
      </div>
      
      <div className="roles-grid">
        {userRoles.map((role) => (
          <div key={role.id} className="role-card">
            <div className="role-header">
              <h4 className="role-name">{role.name}</h4>
              <div className="role-actions">
                <button className="btn-icon" onClick={() => handleEditRole(role)}>
                  <Edit size={16} />
                </button>
                <button className="btn-icon" onClick={() => handleDeleteRole(role)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="role-description">{role.description}</p>
            <div className="role-stats">
              <span className="user-count">{role.users} users</span>
              <span className="permission-count">{role.permissions.length} permissions</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="add-role-card" onClick={handleCreateNewRole}>
        <div className="add-role-content">
          <Plus size={24} className="add-icon" />
          <h4>Create New Role</h4>
          <p>Define custom permissions for specific user groups</p>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="modal-overlay" onClick={closeAllModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New User</h3>
              <button className="modal-close" onClick={closeAllModals}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddUserSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" required className="form-input" placeholder="Enter full name" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" required className="form-input" placeholder="Enter email address" />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" className="form-input" placeholder="Enter phone number" />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select required className="form-select">
                    <option value="">Select a role</option>
                    {userRoles.map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input type="text" className="form-input" placeholder="Enter department" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={closeAllModals}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {showEditRoleModal && selectedRole && (
        <div className="modal-overlay" onClick={closeAllModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Role: {selectedRole.name}</h3>
              <button className="modal-close" onClick={closeAllModals}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleEditRoleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Role Name</label>
                  <input type="text" required className="form-input" defaultValue={selectedRole.name} />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-textarea" rows="3" defaultValue={selectedRole.description}></textarea>
                </div>
                <div className="form-group">
                  <label>Permissions</label>
                  <div className="permissions-grid">
                    <label className="permission-item">
                      <input type="checkbox" defaultChecked />
                      <span>View Patients</span>
                    </label>
                    <label className="permission-item">
                      <input type="checkbox" defaultChecked />
                      <span>Manage Appointments</span>
                    </label>
                    <label className="permission-item">
                      <input type="checkbox" />
                      <span>Access Medical Records</span>
                    </label>
                    <label className="permission-item">
                      <input type="checkbox" />
                      <span>Generate Reports</span>
                    </label>
                    <label className="permission-item">
                      <input type="checkbox" />
                      <span>Manage Billing</span>
                    </label>
                    <label className="permission-item">
                      <input type="checkbox" />
                      <span>System Administration</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={closeAllModals}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && selectedRole && (
        <div className="modal-overlay" onClick={closeAllModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Delete Role</h3>
              <button className="modal-close" onClick={closeAllModals}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="delete-confirmation">
                <AlertTriangle size={48} className="warning-icon" />
                <h4>Are you sure you want to delete this role?</h4>
                <p>Role: <strong>{selectedRole.name}</strong></p>
                <p>This action cannot be undone. All users with this role will need to be reassigned.</p>
                <p className="warning-text">
                  <strong>{selectedRole.users} users</strong> are currently assigned to this role.
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline" onClick={closeAllModals}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm}>
                Delete Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create New Role Modal */}
      {showCreateRoleModal && (
        <div className="modal-overlay" onClick={closeAllModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Role</h3>
              <button className="modal-close" onClick={closeAllModals}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateRoleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Role Name</label>
                  <input type="text" required className="form-input" placeholder="Enter role name" />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-textarea" rows="3" placeholder="Describe the role responsibilities"></textarea>
                </div>
                <div className="form-group">
                  <label>Base Role Template (Optional)</label>
                  <select className="form-select">
                    <option value="">Start from scratch</option>
                    <option value="administrator">Copy from Administrator</option>
                    <option value="doctor">Copy from Doctor</option>
                    <option value="nurse">Copy from Nurse</option>
                    <option value="receptionist">Copy from Receptionist</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Custom Permissions</label>
                  <div className="permissions-grid">
                    <label className="permission-item">
                      <input type="checkbox" />
                      <span>View Patients</span>
                    </label>
                    <label className="permission-item">
                      <input type="checkbox" />
                      <span>Manage Appointments</span>
                    </label>
                    <label className="permission-item">
                      <input type="checkbox" />
                      <span>Access Medical Records</span>
                    </label>
                    <label className="permission-item">
                      <input type="checkbox" />
                      <span>Generate Reports</span>
                    </label>
                    <label className="permission-item">
                      <input type="checkbox" />
                      <span>Manage Billing</span>
                    </label>
                    <label className="permission-item">
                      <input type="checkbox" />
                      <span>System Administration</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={closeAllModals}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderNotificationsSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Notification Settings</h3>
        <p>Configure how and when you receive notifications</p>
      </div>
      
      <div className="notification-groups">
        <div className="notification-group">
          <h4>Notification Channels</h4>
          <div className="notification-options">
            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-label">Email Notifications</span>
                <span className="notification-description">Receive notifications via email</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={() => handleNotificationChange('email')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-label">Push Notifications</span>
                <span className="notification-description">Browser push notifications</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={() => handleNotificationChange('push')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-label">SMS Notifications</span>
                <span className="notification-description">Text message alerts</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={() => handleNotificationChange('sms')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="notification-group">
          <h4>Notification Types</h4>
          <div className="notification-options">
            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-label">Appointment Reminders</span>
                <span className="notification-description">Upcoming appointments and changes</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.appointments}
                  onChange={() => handleNotificationChange('appointments')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-label">Payment Alerts</span>
                <span className="notification-description">Payment confirmations and reminders</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.payments}
                  onChange={() => handleNotificationChange('payments')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-label">System Updates</span>
                <span className="notification-description">System maintenance and updates</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.system}
                  onChange={() => handleNotificationChange('system')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Security Settings</h3>
        <p>Configure security policies and access controls</p>
      </div>
      
      <div className="security-groups">
        <div className="security-group">
          <h4>Authentication</h4>
          <div className="security-options">
            <div className="security-item">
              <div className="security-info">
                <span className="security-label">Two-Factor Authentication</span>
                <span className="security-description">Require 2FA for all users</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={securitySettings.twoFactorAuth}
                  onChange={() => handleSecuritySettingChange('twoFactorAuth', !securitySettings.twoFactorAuth)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="security-item">
              <div className="security-info">
                <span className="security-label">Session Timeout</span>
                <span className="security-description">Minutes of inactivity before logout</span>
              </div>
              <input
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => handleSecuritySettingChange('sessionTimeout', parseInt(e.target.value))}
                className="security-input"
                min="5"
                max="480"
              />
            </div>
            
            <div className="security-item">
              <div className="security-info">
                <span className="security-label">Password Expiry</span>
                <span className="security-description">Days before password expires</span>
              </div>
              <input
                type="number"
                value={securitySettings.passwordExpiry}
                onChange={(e) => handleSecuritySettingChange('passwordExpiry', parseInt(e.target.value))}
                className="security-input"
                min="30"
                max="365"
              />
            </div>
            
            <div className="security-item">
              <div className="security-info">
                <span className="security-label">Max Login Attempts</span>
                <span className="security-description">Failed attempts before account lock</span>
              </div>
              <input
                type="number"
                value={securitySettings.loginAttempts}
                onChange={(e) => handleSecuritySettingChange('loginAttempts', parseInt(e.target.value))}
                className="security-input"
                min="3"
                max="10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Appearance Settings</h3>
        <p>Customize the look and feel of your dashboard</p>
      </div>
      
      <div className="appearance-options">
        <div className="appearance-group">
          <h4>Theme</h4>
          <div className="theme-options">
            <div className="theme-option">
              <div className="theme-preview light-theme">
                <div className="theme-header"></div>
                <div className="theme-content">
                  <div className="theme-sidebar"></div>
                  <div className="theme-main"></div>
                </div>
              </div>
              <label className="theme-label">
                <input type="radio" name="theme" value="light" defaultChecked />
                <Sun size={16} />
                Light Theme
              </label>
            </div>
            
            <div className="theme-option">
              <div className="theme-preview dark-theme">
                <div className="theme-header"></div>
                <div className="theme-content">
                  <div className="theme-sidebar"></div>
                  <div className="theme-main"></div>
                </div>
              </div>
              <label className="theme-label">
                <input type="radio" name="theme" value="dark" />
                <Moon size={16} />
                Dark Theme
              </label>
            </div>
          </div>
        </div>
        
        <div className="appearance-group">
          <h4>Color Scheme</h4>
          <div className="color-options">
            <div className="color-option active" style={{ backgroundColor: '#3b82f6' }}></div>
            <div className="color-option" style={{ backgroundColor: '#10b981' }}></div>
            <div className="color-option" style={{ backgroundColor: '#8b5cf6' }}></div>
            <div className="color-option" style={{ backgroundColor: '#f59e0b' }}></div>
            <div className="color-option" style={{ backgroundColor: '#ef4444' }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Integrations</h3>
        <p>Connect with external services and systems</p>
      </div>
      
      <div className="integrations-list">
        {integrations.map((integration, index) => (
          <div key={index} className="integration-item">
            <div className="integration-info">
              <h4 className="integration-name">{integration.name}</h4>
              <p className="integration-description">{integration.description}</p>
              <span className="integration-sync">Last sync: {integration.lastSync}</span>
            </div>
            <div className="integration-status">
              <span className={`status-badge ${integration.status}`}>
                {integration.status === 'connected' ? <Check size={14} /> : <X size={14} />}
                {integration.status}
              </span>
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => handleConfigure(integration.name)}
              >
                {integration.status === 'connected' ? 'Configure' : 'Connect'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'users':
        return renderUsersSettings();
      case 'notifications':
        return renderNotificationsSettings();
      case 'security':
        return renderSecuritySettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'integrations':
        return renderIntegrationsSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div className="header-left">
          <h1>Settings</h1>
          <p className="page-subtitle">Configure system preferences and manage your clinic</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-outline" 
            onClick={handleReset}
            disabled={isLoading}
          >
            <RefreshCw size={16} />
            Reset to Defaults
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleSave}
            disabled={isLoading}
          >
            <Save size={16} />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
          {saveStatus && (
            <div className={`save-status ${saveStatus}`}>
              {saveStatus === 'success' && <Check size={16} />}
              {saveStatus === 'error' && <X size={16} />}
              {saveStatus === 'reset' && <RefreshCw size={16} />}
              {saveStatus === 'saving' && <RefreshCw size={16} className="spinning" />}
              <span>
                {saveStatus === 'success' && 'Settings saved successfully!'}
                {saveStatus === 'error' && 'Error saving settings'}
                {saveStatus === 'reset' && 'Settings reset to defaults'}
                {saveStatus === 'saving' && 'Saving settings...'}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="settings-content">
        <div className="settings-sidebar">
          <nav className="settings-nav">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="settings-main">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;