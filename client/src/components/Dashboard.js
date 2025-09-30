import React from 'react';
import StatsCards from './StatsCards';
import PatientChart from './PatientChart';
import BalanceCard from './BalanceCard';
import RoomOccupancy from './RoomOccupancy';
import Calendar from './Calendar';
import Reports from './Reports';
import WelcomeMessage from './WelcomeMessage';
import './Dashboard.css';

const Dashboard = ({ data }) => {
  if (!data) {
    return <div className="dashboard-loading">Loading dashboard data...</div>;
  }

  return (
    <div className="dashboard">
      <WelcomeMessage />
      
      <div className="dashboard-grid">
        <div className="dashboard-main">
          <StatsCards stats={data.stats} />
          <PatientChart chartData={data.chartData} />
          
          <div className="dashboard-row">
            <BalanceCard balance={data.balance} />
            <RoomOccupancy occupancy={data.roomOccupancy} />
            <Reports reports={data.reports} />
          </div>
        </div>
        
        <div className="dashboard-sidebar">
          <Calendar appointments={data.appointments} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;