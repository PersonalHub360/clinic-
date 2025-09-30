const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for dashboard
const dashboardData = {
  stats: {
    appointments: { value: 1250, change: 6.8, trend: 'up' },
    consultancy: { value: 1002, change: 40, trend: 'up' },
    surgeries: { value: 60, change: -25, trend: 'down' },
    totalPatients: { value: 1835, change: 21, trend: 'up' }
  },
  chartData: [
    { month: 'JAN', totalPatients: 800, inpatients: 600 },
    { month: 'FEB', totalPatients: 900, inpatients: 700 },
    { month: 'MAR', totalPatients: 1100, inpatients: 850 },
    { month: 'APR', totalPatients: 950, inpatients: 750 },
    { month: 'MAY', totalPatients: 1000, inpatients: 800 },
    { month: 'JUN', totalPatients: 1200, inpatients: 950 },
    { month: 'JUL', totalPatients: 1856, inpatients: 1400 },
    { month: 'AUG', totalPatients: 1400, inpatients: 1100 },
    { month: 'SEP', totalPatients: 1300, inpatients: 1000 },
    { month: 'OCT', totalPatients: 1500, inpatients: 1200 },
    { month: 'NOV', totalPatients: 1600, inpatients: 1300 },
    { month: 'DEC', totalPatients: 1400, inpatients: 1100 }
  ],
  balance: {
    totalIncome: 8135450,
    percentage: 87,
    totalRevenue: 136450,
    totalExpense: 7999000
  },
  roomOccupancy: {
    overall: 52,
    generalRoom: 124,
    privateRoom: 52
  },
  appointments: [
    {
      id: 1,
      title: 'Dentist meetup',
      time: '10:00am - 11:00pm',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Procedures',
      time: '12:00pm - 04:00pm',
      type: 'procedure'
    }
  ],
  reports: [
    {
      id: 1,
      title: 'A shower broken in room 123...',
      time: '1 minute ago',
      status: 'new'
    },
    {
      id: 2,
      title: 'A shower broken in room 123...',
      time: '1 minute ago',
      status: 'new'
    }
  ]
};

// API Routes
app.get('/api/dashboard', (req, res) => {
  res.json(dashboardData);
});

app.get('/api/stats', (req, res) => {
  res.json(dashboardData.stats);
});

app.get('/api/chart-data', (req, res) => {
  res.json(dashboardData.chartData);
});

app.get('/api/balance', (req, res) => {
  res.json(dashboardData.balance);
});

app.get('/api/room-occupancy', (req, res) => {
  res.json(dashboardData.roomOccupancy);
});

app.get('/api/appointments', (req, res) => {
  res.json(dashboardData.appointments);
});

app.get('/api/reports', (req, res) => {
  res.json(dashboardData.reports);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Prime Clinic server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});