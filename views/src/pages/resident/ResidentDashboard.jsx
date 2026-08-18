import React from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from '../../components/DashboardCard';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const ResidentDashboard = () => {
  const { currentUser } = useAuth(); const { bills } = useData();
  const pending = bills.filter((bill) => bill.status === 'Pending');
  return <div><div className="d-flex justify-content-between align-items-center mb-4"><div><h2 className="fw-bold mb-1">Welcome, {currentUser?.name}</h2><p className="text-muted mb-0">Resident Portal</p></div><div className="d-flex gap-2"><Link to="/resident/complaint" className="btn btn-society-dark btn-sm">Lodge Complaint</Link><Link to="/resident/visitor-pass" className="btn btn-society-red btn-sm">Generate Gate Pass</Link></div></div><div className="row g-3 mb-4"><div className="col-md-6"><DashboardCard title="Pending Bills" value={pending.length} subtitle={pending.length ? `Total: Rs. ${pending.reduce((total, bill) => total + bill.amount, 0)}` : 'All cleared'} /></div><div className="col-md-6"><DashboardCard title="Total Bills" value={bills.length} subtitle="Loaded from your flat billing API" /></div></div><div className="society-card"><div className="society-card-header"><h3 className="society-card-title">My Recent Bills</h3><Link to="/resident/bills" className="btn btn-sm btn-society-outline">View all</Link></div><div className="table-responsive"><table className="society-table"><thead><tr><th>Amount</th><th>Due date</th><th>Status</th></tr></thead><tbody>{bills.slice(0, 5).map((bill) => <tr key={bill.id}><td>Rs. {bill.amount}</td><td>{bill.dueDate}</td><td><StatusBadge status={bill.status} /></td></tr>)}{!bills.length && <tr><td colSpan="3" className="text-center py-3 text-muted">No bills available.</td></tr>}</tbody></table></div></div></div>;
};
export default ResidentDashboard;
