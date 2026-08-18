import React, { useState } from 'react';
import Swal from 'sweetalert2';
import StatusBadge from '../../components/StatusBadge';
import { useData } from '../../context/DataContext';

const ActiveVisitors = () => {
  const { activeVisitors, markVisitorExit } = useData();
  const [filter, setFilter] = useState('Active');

  const handleMarkExit = (visitor) => {
    Swal.fire({
      title: 'Mark Visitor Exit?',
      html: `Confirm exit for <strong>${visitor.visitorName}</strong> (Flat ${visitor.flat})?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Mark Exit'
    }).then((result) => {
      if (result.isConfirmed) {
        markVisitorExit(visitor.id);

        Swal.fire({
          icon: 'success',
          title: 'Exit Recorded!',
          text: `${visitor.visitorName} marked as Exited from society premises.`,
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  const filteredVisitors = activeVisitors.filter((v) => {
    if (filter === 'All') return true;
    return v.status === filter;
  });

  const currentlyInsideCount = activeVisitors.filter((v) => v.status === 'Active').length;

  return (
    <div className="guard-page">
      {/* Page Header */}
      <div className="portal-page-header guard-header mb-4">
        <h2 className="fw-bold mb-1">Active Society Visitors</h2>
        <p className="text-muted mb-0">Live security log of guests and delivery personnel currently inside society premises.</p>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4 portal-stat-grid">
        <div className="col-12 col-md-6">
          <div className="society-card mb-0" style={{ borderLeft: '4px solid #198754' }}>
            <div className="stat-label">Currently Inside Society</div>
            <div className="stat-value text-success">{currentlyInsideCount}</div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="society-card mb-0">
            <div className="stat-label">Total Recorded Entries Today</div>
            <div className="stat-value">{activeVisitors.length}</div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="society-card">
        <div className="society-card-header flex-wrap gap-2">
          <h3 className="society-card-title">Visitor Security Log</h3>
          <div className="d-flex gap-2">
            <button
              className={`btn btn-sm ${filter === 'Active' ? 'btn-society-red' : 'btn-society-outline'}`}
              onClick={() => setFilter('Active')}
            >
              Currently Inside ({currentlyInsideCount})
            </button>
            <button
              className={`btn btn-sm ${filter === 'All' ? 'btn-society-red' : 'btn-society-outline'}`}
              onClick={() => setFilter('All')}
            >
              All Records ({activeVisitors.length})
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="society-table">
            <thead>
              <tr>
                <th>Visitor Name</th>
                <th>Phone Number</th>
                <th>Destination Flat</th>
                <th>Vehicle Number</th>
                <th>Entry Time</th>
                <th>Entry Type</th>
                <th>Status</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.map((visitor) => (
                <tr key={visitor.id}>
                  <td className="fw-bold">{visitor.visitorName}</td>
                  <td>{visitor.phone}</td>
                  <td>Flat {visitor.flat}</td>
                  <td>{visitor.vehicle || 'None'}</td>
                  <td>{visitor.entryTime}</td>
                  <td>
                    <span className="badge bg-light text-dark border">
                      {visitor.passCode ? `Pass (${visitor.passCode})` : 'Walk-in'}
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={visitor.status} />
                  </td>
                  <td className="text-end">
                    {visitor.status === 'Active' ? (
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleMarkExit(visitor)}
                      >
                        <i className="fa-solid fa-arrow-right-from-bracket"></i> Mark Exit
                      </button>
                    ) : (
                      <span className="text-muted small">Exited</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredVisitors.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-muted">
                    No visitors matching current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActiveVisitors;
