import React from 'react';

const DashboardCard = ({ title, value, icon, subtitle }) => {
  return (
    <div className="stat-card">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div className="stat-label">{title}</div>
          <div className="stat-value">{value}</div>
          {subtitle && <small className="text-muted mt-1 d-block">{subtitle}</small>}
        </div>
        {icon && <div className="stat-icon">{icon}</div>}
      </div>
    </div>
  );
};

export default DashboardCard;
