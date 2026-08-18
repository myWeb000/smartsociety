import React from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from '../../components/DashboardCard';
import StatusBadge from '../../components/StatusBadge';
import { useData } from '../../context/DataContext';

const AdminDashboard = () => {
  const { flats, bills, complaints, dashboardStats } = useData();

  const totalResidents = dashboardStats?.totalResidents ?? flats.filter((f) => f.resident && f.resident !== 'Unassigned').length;
  const totalFlats = flats.length;
  const totalComplaints = complaints.length;
  const pendingBills = dashboardStats?.pendingBills ?? bills.filter((b) => b.status === 'Pending').length;

  const recentComplaints = complaints.slice(0, 4);
  const recentBills = bills.slice(0, 4);
  const recentFlats = flats.slice(0, 4);

  return (
    <div className="admin-page">
      {/* Welcome Banner */}
      <div className="admin-page-header d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <span className="admin-eyebrow">OPERATIONS OVERVIEW</span><h2 className="fw-bold mb-1">Welcome back, Admin</h2>
          <p className="text-muted mb-0">Here is the latest overview of your society operations.</p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/admin/flats" className="btn btn-society-dark btn-sm">
            <i className="fa-solid fa-plus" /> Add Flat
          </Link>
          <Link to="/admin/bills" className="btn btn-society-red btn-sm">
            <i className="fa-solid fa-file-invoice-dollar" /> Generate Bill
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4 admin-stat-grid">
        <div className="col-12 col-sm-6 col-xl-3">
          <DashboardCard
            title="Total Residents"
            value={totalResidents}
            icon={<i className="fa-solid fa-users"></i>}
            subtitle="Registered active occupants"
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <DashboardCard
            title="Total Flats"
            value={totalFlats}
            icon={<i className="fa-solid fa-building"></i>}
            subtitle={`${flats.filter((f) => f.status === 'Available').length} vacant units`}
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <DashboardCard
            title="Complaints"
            value={totalComplaints}
            icon={<i className="fa-solid fa-pen-to-square"></i>}
            subtitle={`${complaints.filter((c) => c.status === 'Pending').length} pending review`}
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <DashboardCard
            title="Pending Bills"
            value={pendingBills}
            icon={<i className="fa-solid fa-money-bill"></i>}
            subtitle="Awaiting payment"
          />
        </div>
      </div>

      {/* Main Grid: Recent Complaints & Bills */}
      <div className="row g-4 mb-4">
        {/* Recent Complaints */}
        <div className="col-12 col-lg-7">
          <div className="society-card h-100 mb-0">
            <div className="society-card-header">
              <h3 className="society-card-title">Recent Complaints</h3>
              <Link to="/admin/complaints" className="btn btn-sm btn-society-outline">
                View All
              </Link>
            </div>
            <div className="table-responsive">
              <table className="society-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Resident</th>
                    <th>Flat</th>
                    <th>Category</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentComplaints.map((c) => (
                    <tr key={c.id}>
                      <td className="fw-bold">{c.id}</td>
                      <td>{c.resident}</td>
                      <td>Flat {c.flat}</td>
                      <td>{c.category}</td>
                      <td>
                        <StatusBadge status={c.status} />
                      </td>
                    </tr>
                  ))}
                  {recentComplaints.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-3">
                        No complaints recorded.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Bills */}
        <div className="col-12 col-lg-5">
          <div className="society-card h-100 mb-0">
            <div className="society-card-header">
              <h3 className="society-card-title">Recent Bills</h3>
              <Link to="/admin/bills" className="btn btn-sm btn-society-outline">
                View All
              </Link>
            </div>
            <div className="table-responsive">
              <table className="society-table">
                <thead>
                  <tr>
                    <th>Bill ID</th>
                    <th>Flat</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBills.map((b) => (
                    <tr key={b.id}>
                      <td className="fw-bold">{b.id}</td>
                      <td>Flat {b.flatNumber}</td>
                      <td className="fw-semibold">₹{b.amount}</td>
                      <td>
                        <StatusBadge status={b.status} />
                      </td>
                    </tr>
                  ))}
                  {recentBills.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-3">
                        No bills generated yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Flats & Occupancy */}
      <div className="society-card">
        <div className="society-card-header">
          <h3 className="society-card-title">Society Flats & Residents Directory</h3>
          <Link to="/admin/flats" className="btn btn-sm btn-society-outline">
            Manage All Flats
          </Link>
        </div>
        <div className="table-responsive">
          <table className="society-table">
            <thead>
              <tr>
                <th>Block</th>
                <th>Flat Number</th>
                <th>Resident Name</th>
                <th>Occupancy Status</th>
              </tr>
            </thead>
            <tbody>
              {recentFlats.map((flat) => (
                <tr key={flat.id}>
                  <td className="fw-bold">{flat.block}</td>
                  <td>Flat {flat.flatNumber}</td>
                  <td>{flat.resident}</td>
                  <td>
                    <StatusBadge status={flat.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
