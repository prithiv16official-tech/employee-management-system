import React from 'react';

const StatsCards = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-value">{stats.total_employees || 0}</div>
        <div className="stat-label">Total Employees</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{stats.active_employees || 0}</div>
        <div className="stat-label">Active</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{stats.inactive_employees || 0}</div>
        <div className="stat-label">Inactive</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{stats.total_departments || 0}</div>
        <div className="stat-label">Departments</div>
      </div>
    </div>
  );
};

export default StatsCards;
