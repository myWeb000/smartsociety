import React, { useState } from 'react';
import Swal from 'sweetalert2';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const LodgeComplaint = () => {
  const { currentUser } = useAuth();
  const { complaints, lodgeComplaint } = useData();

  const userFlat = currentUser?.flatNumber || '101';
  const userName = currentUser?.name || 'Ali Khan';

  const [category, setCategory] = useState('Plumbing');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Description Required',
        text: 'Please describe the issue or problem in detail.',
        confirmButtonColor: '#dc3545'
      });
      return;
    }

    const newComplaint = lodgeComplaint({
      resident: userName,
      flat: userFlat,
      category,
      description: description.trim(),
      image: imagePreview
    });

    Swal.fire({
      icon: 'success',
      title: 'Complaint Lodged Successfully!',
      html: `Your complaint <strong>${newComplaint.id}</strong> has been registered with status: <strong>Pending</strong>.`,
      confirmButtonColor: '#dc3545'
    });

    // Reset Form
    setDescription('');
    setImagePreview(null);
  };

  // Recent complaints by this user
  const myComplaints = complaints.filter(
    (c) => c.flat === userFlat || c.resident.includes(userName.split(' ')[0])
  );

  return (
    <div className="resident-page">
      {/* Page Header */}
      <div className="portal-page-header resident-header mb-4">
        <h2 className="fw-bold mb-1">Lodge a Complaint</h2>
        <p className="text-muted mb-0">Report maintenance, plumbing, electrical or other society issues to management.</p>
      </div>

      <div className="row g-4">
        {/* Complaint Form */}
        <div className="col-12 col-lg-7">
          <div className="society-card portal-form-card">
            <div className="society-card-header">
              <h3 className="society-card-title">New Complaint Form</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold small text-secondary">
                    CATEGORY <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold small text-secondary">
                    RESIDENT / FLAT
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={`${userName} (Flat ${userFlat})`}
                    disabled
                    style={{ backgroundColor: '#f8f9fa' }}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold small text-secondary">
                    DETAILED DESCRIPTION <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Describe the problem, location in flat or building, and any urgency..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold small text-secondary">
                    ATTACH PHOTO (OPTIONAL)
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <div className="mt-2 position-relative d-inline-block">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          width: '120px',
                          height: '90px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                          border: '1px solid #ced4da'
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="btn btn-sm btn-danger position-absolute top-0 end-0 py-0 px-1"
                        style={{ fontSize: '0.7rem' }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                <div className="col-12 d-flex justify-content-end mt-4">
                  <button type="submit" className="btn btn-society-red">
                    Submit Complaint
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Complaints History Side Card */}
        <div className="col-12 col-lg-5">
          <div className="society-card">
            <div className="society-card-header">
              <h3 className="society-card-title">My Lodged Complaints</h3>
            </div>
            <div className="table-responsive">
              <table className="society-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myComplaints.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <div className="fw-semibold">{c.category}</div>
                        <small className="text-muted text-truncate d-block" style={{ maxWidth: '140px' }}>
                          {c.description}
                        </small>
                      </td>
                      <td>{c.date}</td>
                      <td>
                        <StatusBadge status={c.status} />
                      </td>
                    </tr>
                  ))}
                  {myComplaints.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center py-4 text-muted">
                        No complaints lodged yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LodgeComplaint;
