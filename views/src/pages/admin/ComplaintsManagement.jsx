import React, { useState } from 'react';
import Swal from 'sweetalert2';
import StatusBadge from '../../components/StatusBadge';
import { useData } from '../../context/DataContext';
import { getErrorMessage } from '../../api/client';

const ComplaintsManagement = () => {
  const { complaints, updateComplaintStatus } = useData();
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const handleStatusChange = async (id, newStatus) => {
    try { await updateComplaintStatus(id, newStatus);

    Swal.fire({
      icon: 'success',
      title: 'Status Updated!',
      text: `Complaint ${id} status changed to ${newStatus}.`,
      timer: 1500,
      showConfirmButton: false
    }); } catch (error) { Swal.fire({ icon: 'error', title: 'Update failed', text: getErrorMessage(error) }); }
  };

  const handleViewDetails = (complaint) => {
    Swal.fire({
      title: `Complaint ${complaint.id}`,
      html: `
        <div style="text-align: left; font-size: 0.95rem;">
          <p><strong>Resident:</strong> ${complaint.resident} (Flat ${complaint.flat})</p>
          <p><strong>Category:</strong> ${complaint.category}</p>
          <p><strong>Date:</strong> ${complaint.date}</p>
          <p><strong>Status:</strong> ${complaint.status}</p>
          <hr />
          <p><strong>Description:</strong></p>
          <p style="background: #f8f9fa; padding: 10px; border-radius: 6px;">${complaint.description}</p>
          ${complaint.image ? `<p><strong>Attachment:</strong></p><img src="${complaint.image}" style="max-width: 100%; border-radius: 6px;" />` : ''}
        </div>
      `,
      confirmButtonColor: '#212529',
      confirmButtonText: 'Close'
    });
  };

  const filteredComplaints = complaints.filter((c) => {
    const matchesCategory = filterCategory === 'All' || c.category === filterCategory;
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
    return matchesCategory && matchesStatus;
  });

  return (
    <div className="admin-page">
      {/* Page Header */}
      <div className="admin-page-header mb-4"><span className="admin-eyebrow">SERVICE DESK</span>
        <h2 className="fw-bold mb-1">Complaints management</h2>
        <p className="text-muted mb-0">Track and resolve complaints submitted by society residents.</p>
      </div>

      {/* Filters Card */}
      <div className="society-card admin-filter-card mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-4">
            <label className="form-label fw-semibold small text-secondary">
              FILTER BY CATEGORY
            </label>
            <select
              className="form-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label fw-semibold small text-secondary">
              FILTER BY STATUS
            </label>
            <select
              className="form-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="col-12 col-md-4 d-flex align-items-end">
            <button
              className="btn btn-society-outline w-100"
              onClick={() => {
                setFilterCategory('All');
                setFilterStatus('All');
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="society-card">
        <div className="society-card-header">
          <h3 className="society-card-title">Complaints List ({filteredComplaints.length})</h3>
        </div>
        <div className="table-responsive">
          <table className="society-table">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Resident</th>
                <th>Flat</th>
                <th>Category</th>
                <th>Description</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-end">Update Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((c) => (
                <tr key={c.id}>
                  <td className="fw-bold">{c.id}</td>
                  <td>{c.resident}</td>
                  <td>Flat {c.flat}</td>
                  <td>{c.category}</td>
                  <td style={{ maxWidth: '240px' }} className="text-truncate">
                    <span
                      style={{ cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => handleViewDetails(c)}
                      title="Click to view details"
                    >
                      {c.description}
                    </span>
                  </td>
                  <td>{c.date}</td>
                  <td>
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="text-end">
                    <select
                      className="form-select form-select-sm d-inline-block"
                      style={{ width: '135px', fontWeight: '500' }}
                      value={c.status}
                      onChange={(e) => handleStatusChange(c.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In-Progress">In-Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
              {filteredComplaints.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-muted">
                    No complaints found matching your criteria.
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

export default ComplaintsManagement;
