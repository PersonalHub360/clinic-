import React from 'react';
import { TrendingUp } from 'lucide-react';
import './BalanceCard.css';

const BalanceCard = ({ balance }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="balance-card card">
      <div className="card-header">
        <h3 className="card-title">Balance</h3>
        <button className="btn btn-secondary">Open</button>
      </div>
      
      <div className="balance-content">
        <div className="balance-circle">
          <div className="balance-percentage">
            <span className="percentage-value">{balance?.percentage || 0}%</span>
          </div>
          <svg className="balance-ring" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#10b981"
              strokeWidth="8"
              strokeDasharray={`${(balance?.percentage || 0) * 2.83} 283`}
              strokeDashoffset="0"
              transform="rotate(-90 50 50)"
              className="balance-progress"
            />
          </svg>
        </div>
        
        <div className="balance-details">
          <div className="balance-item">
            <span className="balance-label">Total income</span>
            <span className="balance-value income">
              {formatCurrency(balance?.totalIncome || 0)}
            </span>
          </div>
          
          <div className="balance-item">
            <span className="balance-label">Total Transaction Revenue</span>
            <div className="revenue-container">
              <span className="balance-value revenue">
                {formatCurrency(balance?.totalRevenue || 0)}
              </span>
              <TrendingUp className="trend-icon" />
            </div>
          </div>
          
          <div className="balance-item">
            <span className="balance-label">Total expense</span>
            <span className="balance-value expense">
              {formatCurrency(balance?.totalExpense || 0)}
            </span>
            <TrendingUp className="trend-icon small" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;