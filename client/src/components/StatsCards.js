import React from 'react';
import { Calendar, Phone, Scissors, Users, TrendingUp, TrendingDown } from 'lucide-react';
import './StatsCards.css';

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Appointments',
      value: stats?.appointments?.value || 0,
      change: stats?.appointments?.change || 0,
      trend: stats?.appointments?.trend || 'up',
      icon: Calendar,
      color: '#10b981',
      bgColor: '#ecfdf5'
    },
    {
      title: 'Call consultancy',
      value: stats?.consultancy?.value || 0,
      change: stats?.consultancy?.change || 0,
      trend: stats?.consultancy?.trend || 'up',
      icon: Phone,
      color: '#3b82f6',
      bgColor: '#eff6ff'
    },
    {
      title: 'Surgeries',
      value: stats?.surgeries?.value || 0,
      change: stats?.surgeries?.change || 0,
      trend: stats?.surgeries?.trend || 'down',
      icon: Scissors,
      color: '#f59e0b',
      bgColor: '#fffbeb'
    },
    {
      title: 'Total patient',
      value: stats?.totalPatients?.value || 0,
      change: stats?.totalPatients?.change || 0,
      trend: stats?.totalPatients?.trend || 'up',
      icon: Users,
      color: '#8b5cf6',
      bgColor: '#f3e8ff'
    }
  ];

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <div className="stats-cards">
      {cards.map((card, index) => (
        <div key={index} className="stat-card">
          <div className="stat-icon-container" style={{ backgroundColor: card.bgColor }}>
            <card.icon className="stat-icon" style={{ color: card.color }} />
          </div>
          
          <div className="stat-content">
            <h3 className="stat-title">{card.title}</h3>
            <div className="stat-value">{formatNumber(card.value)}</div>
            
            <div className="stat-change">
              {card.trend === 'up' ? (
                <TrendingUp className="trend-icon trend-up" />
              ) : (
                <TrendingDown className="trend-icon trend-down" />
              )}
              <span className={`change-text ${card.trend === 'up' ? 'positive' : 'negative'}`}>
                {card.change > 0 ? '+' : ''}{card.change}% from last week
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;