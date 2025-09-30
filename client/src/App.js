import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import PatientsPage from './components/PatientsPage';
import AppointmentsPage from './components/AppointmentsPage';
import PaymentsPage from './components/PaymentsPage';
import EmployeePage from './components/EmployeePage';
import ActivityPage from './components/ActivityPage';
import StatisticsPage from './components/StatisticsPage';
import SettingsPage from './components/SettingsPage';
import Auth from './components/Auth';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('Dashboard');

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Fetch dashboard data only when user is authenticated
    if (user && user.isAuthenticated) {
      const fetchDashboardData = async () => {
        try {
          const response = await axios.get('http://localhost:5001/api/dashboard');
          setDashboardData(response.data);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        }
      };

      fetchDashboardData();
    }
  }, [user]);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setDashboardData(null);
    setCurrentPage('Dashboard'); // Reset to dashboard on logout
  };

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard data={dashboardData} />;
      case 'Patients':
        return <PatientsPage />;
      case 'Appointments':
        return <AppointmentsPage />;
      case 'Payments':
        return <PaymentsPage />;
      case 'Employee':
        return <EmployeePage />;
      case 'Activity':
        return <ActivityPage />;
      case 'Statistics':
        return <StatisticsPage />;
      case 'Settings':
        return <SettingsPage />;
      default:
        return <Dashboard data={dashboardData} />;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Prime Clinic...</p>
      </div>
    );
  }

  // Show authentication if user is not logged in
  if (!user || !user.isAuthenticated) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  // Show dashboard if user is authenticated
  return (
    <div className="app">
      <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
      <div className="main-content">
        <Header user={user} onLogout={handleLogout} />
        {renderCurrentPage()}
      </div>
    </div>
  );
}

export default App;
