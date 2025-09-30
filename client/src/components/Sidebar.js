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

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Users, label: 'Patients' },
    { icon: Calendar, label: 'Appointment' },
    { icon: CreditCard, label: 'Payments' },
    { icon: UserCheck, label: 'Employee' },
    { icon: Activity, label: 'Activity' }
  ];

  const otherMenuItems = [
    { icon: BarChart3, label: 'Statistic' },
    { icon: HelpCircle, label: 'Help & Center' },
    { icon: Settings, label: 'Setting' },
    { icon: FileText, label: 'Report' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <CheckCircle className="logo-icon" />
          <span className="logo-text">Medcare</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <span className="nav-label">MENU</span>
          <ul className="nav-list">
            {menuItems.map((item, index) => (
              <li key={index} className={`nav-item ${item.active ? 'active' : ''}`}>
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
              <li key={index} className="nav-item">
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