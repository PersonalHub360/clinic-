import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import './PatientChart.css';

const PatientChart = ({ chartData }) => {
  return (
    <div className="patient-chart card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Patient statistics</h3>
        </div>
        <div className="chart-controls">
          <button className="chart-btn active">Week</button>
          <button className="chart-btn">Month</button>
          <button className="chart-btn">Year-2022</button>
        </div>
      </div>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              domain={[0, 'dataMax + 500']}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              wrapperStyle={{ paddingTop: '20px' }}
            />
            <Line 
              type="monotone" 
              dataKey="totalPatients" 
              stroke="#1e293b" 
              strokeWidth={3}
              dot={{ fill: '#1e293b', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#1e293b', strokeWidth: 2 }}
              name="Total patients"
            />
            <Line 
              type="monotone" 
              dataKey="inpatients" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
              name="Inpatients"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="chart-highlight">
        <div className="highlight-value">1,856</div>
        <div className="highlight-label">Peak patients in July</div>
      </div>
    </div>
  );
};

export default PatientChart;