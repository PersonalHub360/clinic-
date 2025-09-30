import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  CreditCard, 
  UserCheck, 
  Activity, 
  BarChart3, 
  HelpCircle, 
  Settings, 
  FileText,
  CheckCircle
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ currentPage, onPageChange }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', page: 'Dashboard' },
    { icon: Users, label: 'Patients', page: 'Patients' },
    { icon: Calendar, label: 'Appointments', page: 'Appointments' },
    { icon: CreditCard, label: 'Payments', page: 'Payments' },
    { icon: UserCheck, label: 'Employee', page: 'Employee' },
    { icon: Activity, label: 'Activity', page: 'Activity' }
  ];

  const otherMenuItems = [
    { icon: BarChart3, label: 'Statistics', page: 'Statistics' },
    { icon: HelpCircle, label: 'Help & Center', page: 'Help' },
    { icon: Settings, label: 'Settings', page: 'Settings' },
    { icon: FileText, label: 'Report', page: 'Report' }
  ];

  const handleItemClick = (page) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <Activity />
          </div>
          <span className="logo-text">Prime Clinic</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <span className="nav-label">MENU</span>
          <ul className="nav-list">
            {menuItems.map((item, index) => (
              <li 
                key={index} 
                className={`nav-item ${currentPage === item.page ? 'active' : ''}`}
                onClick={() => handleItemClick(item.page)}
                style={{ cursor: 'pointer' }}
              >
                <item.icon className="nav-icon" />
                <span className="nav-text">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-section">
          <span className="nav-label">OTHER MENU</span>
          <ul className="nav-list">
            {otherMenuItems.map((item, index) => (
              <li 
                key={index} 
                className={`nav-item ${currentPage === item.page ? 'active' : ''}`}
                onClick={() => handleItemClick(item.page)}
                style={{ cursor: 'pointer' }}
              >
                <item.icon className="nav-icon" />
                <span className="nav-text">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;