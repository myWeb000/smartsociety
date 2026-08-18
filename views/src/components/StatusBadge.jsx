import React from 'react';

const StatusBadge = ({ status }) => {
  if (!status) return null;

  const normalized = status.toLowerCase();

  let badgeClass = 'badge-pending';

  if (normalized === 'resolved' || normalized === 'paid' || normalized === 'occupied' || normalized === 'confirmed') {
    badgeClass = 'badge-resolved';
  } else if (normalized === 'in-progress') {
    badgeClass = 'badge-in-progress';
  } else if (normalized === 'overdue' || normalized === 'exited' || normalized === 'expired' || normalized === 'used') {
    badgeClass = 'badge-overdue';
  } else if (normalized === 'available' || normalized === 'active') {
    badgeClass = 'badge-active';
  }

  return (
    <span className={badgeClass}>
      {status}
    </span>
  );
};

export default StatusBadge;
