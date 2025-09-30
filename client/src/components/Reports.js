import React from 'react';
import { MoreHorizontal, FileText, ArrowRight } from 'lucide-react';
import './Reports.css';

const Reports = ({ reports }) => {
  return (
    <div className="reports card">
      <div className="card-header">
        <h3 className="card-title">Reports</h3>
        <button className="more-btn">
          <MoreHorizontal className="more-icon" />
        </button>
      </div>
      
      <div className="reports-content">
        {reports && reports.length > 0 ? (
          <div className="reports-list">
            {reports.map((report) => (
              <div key={report.id} className="report-item">
                <div className="report-icon-container">
                  <FileText className="report-icon" />
                </div>
                <div className="report-content">
                  <div className="report-title">{report.title}</div>
                  <div className="report-time">{report.time}</div>
                </div>
                <div className="report-actions">
                  <button className="view-report-btn">
                    View report
                    <ArrowRight className="arrow-icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-reports">
            <FileText className="no-reports-icon" />
            <p>No reports available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;