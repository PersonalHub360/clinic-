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
import BillManagement from './components/BillManagement';
import ReportsPage from './components/ReportsPage';
import Auth from './components/Auth';
import AddPatientModal from './components/AddPatientModal';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

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

  const handleAddPatient = () => {
    setShowAddPatientModal(true);
  };

  const handleCloseAddPatientModal = () => {
    setShowAddPatientModal(false);
  };

  const handleSavePatient = (newPatient) => {
    const patientWithId = {
      ...newPatient,
      id: patients.length + 1,
      name: newPatient.name, // Use the name field directly from AddPatientModal
      age: newPatient.age,
      gender: newPatient.gender,
      phone: newPatient.phone,
      email: newPatient.email,
      lastVisit: new Date().toISOString().split('T')[0],
      status: 'Active',
      condition: newPatient.condition || 'General',
      avatar: `https://images.unsplash.com/photo-${newPatient.gender === 'Male' ? '1507003211169-0a1dd7228f2d' : '1494790108755-2616b612b786'}?w=40&h=40&fit=crop&crop=face`
    };
    setPatients(prev => [...prev, patientWithId]);
    setShowAddPatientModal(false);
  };

  const handleSaveAppointment = (appointmentData) => {
    setAppointments(prev => [...prev, appointmentData]);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard data={dashboardData} />;
      case 'Patients':
        return <PatientsPage 
          patients={patients} 
          onSavePatient={handleSavePatient}
          appointments={appointments}
          onSaveAppointment={handleSaveAppointment}
        />;
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
      case 'BillManagement':
        return <BillManagement />;
      case 'Report':
        return <ReportsPage />;
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
        <Header user={user} onLogout={handleLogout} onAddPatient={handleAddPatient} />
        {renderCurrentPage()}
      </div>
      
      {/* Add Patient Modal */}
      <AddPatientModal 
        isOpen={showAddPatientModal}
        onClose={handleCloseAddPatientModal}
        onSave={handleSavePatient}
      />
    </div>
  );
}

export default App;
