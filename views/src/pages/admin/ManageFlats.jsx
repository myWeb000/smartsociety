import React, { useState } from 'react';
import Swal from 'sweetalert2';
import StatusBadge from '../../components/StatusBadge';
import { useData } from '../../context/DataContext';
import { getErrorMessage } from '../../api/client';

const ManageFlats = () => {
  const { flats, residents, addFlat, assignResident } = useData();

  const [block, setBlock] = useState('Block A');
  const [flatNumber, setFlatNumber] = useState('');
  const [selectedResidents, setSelectedResidents] = useState({});

  const handleAddFlat = async (e) => {
    e.preventDefault();

    if (!flatNumber.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Flat Number Required',
        text: 'Please enter a valid flat number (e.g., 104, 205).',
        confirmButtonColor: '#dc3545'
      });
      return;
    }

    // Check if flat already exists in block
    const exists = flats.some(
      (f) => f.block === block && f.flatNumber.toLowerCase() === flatNumber.trim().toLowerCase()
    );

    if (exists) {
      Swal.fire({
        icon: 'warning',
        title: 'Flat Already Exists',
        text: `Flat ${flatNumber} already exists in ${block}.`,
        confirmButtonColor: '#dc3545'
      });
      return;
    }

    try {
    await addFlat({
      block,
      flatNumber: flatNumber.trim()
    });

    Swal.fire({
      icon: 'success',
      title: 'Flat Added Successfully!',
      text: `Flat ${flatNumber} has been added to ${block}.`,
      confirmButtonColor: '#dc3545'
    });

    // Reset Form
    setFlatNumber('');
    } catch (error) { Swal.fire({ icon: 'error', title: 'Could not add flat', text: getErrorMessage(error) }); }
  };

  const handleCancel = () => {
    setFlatNumber('');
  };

  const handleAssignResident = async (flat) => {
    const residentId = selectedResidents[flat.id];
    if (!residentId) return Swal.fire({ icon: 'info', title: 'Select a resident', text: 'Choose a resident before assigning the flat.' });
    try { await assignResident(flat.id, residentId); setSelectedResidents((items) => ({ ...items, [flat.id]: '' })); Swal.fire({ icon: 'success', title: 'Resident assigned', text: 'The flat assignment has been saved.' }); }
    catch (error) { Swal.fire({ icon: 'error', title: 'Assignment failed', text: getErrorMessage(error) }); }
  };


  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header mb-4"><span className="admin-eyebrow">PROPERTY DIRECTORY</span>
        <h2 className="fw-bold mb-1">Flats & residents</h2>
        <p className="text-muted mb-0">Add new flats and maintain a clear occupancy overview.</p>
      </div>

      {/* Add Flat Form Card */}
      <div className="society-card admin-form-card mb-4">
        <div className="society-card-header">
          <h3 className="society-card-title"><i className="fa-solid fa-circle-plus" /> Add a flat</h3>
        </div>
        <form onSubmit={handleAddFlat}>
          <div className="row g-3">
            <div className="col-12 col-md-4">
              <label className="form-label fw-semibold small text-secondary">
                BLOCK NAME <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                value={block}
                onChange={(e) => setBlock(e.target.value)}
              >
                <option value="Block A">Block A</option>
                <option value="Block B">Block B</option>
                <option value="Block C">Block C</option>
                <option value="Block D">Block D</option>
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label fw-semibold small text-secondary">
                FLAT NUMBER <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. 104, 205"
                value={flatNumber}
                onChange={(e) => setFlatNumber(e.target.value)}
              />
            </div>

            <div className="col-12 d-flex gap-2 justify-content-end mt-4">
              <button
                type="button"
                className="btn btn-society-outline"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-society-red">
                + Add Flat
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Flats Directory Table */}
      <div className="society-card">
        <div className="society-card-header">
          <h3 className="society-card-title">All Society Flats ({flats.length})</h3>
        </div>
        <div className="table-responsive">
          <table className="society-table">
            <thead>
              <tr>
                <th>Block</th>
                <th>Flat Number</th>
                <th>Resident</th>
                <th>Status</th>
                <th className="text-end">Assignment</th>
              </tr>
            </thead>
            <tbody>
              {flats.map((flat) => (
                <tr key={flat.id}>
                  <td className="fw-bold">{flat.block}</td>
                  <td>Flat {flat.flatNumber}</td>
                  <td>{flat.resident || 'Unassigned'}</td>
                  <td>
                    <StatusBadge status={flat.status} />
                  </td>
                  <td className="text-end"><div className="d-flex justify-content-end gap-2"><select className="form-select form-select-sm" style={{ minWidth: '180px' }} value={selectedResidents[flat.id] || ''} onChange={(event) => setSelectedResidents((items) => ({ ...items, [flat.id]: event.target.value }))}><option value="">Select resident</option>{residents.map((resident) => <option key={resident.id} value={resident.id} disabled={resident.flatId && resident.flatId !== flat.id}>{resident.name} — {resident.email}</option>)}</select><button type="button" className="btn btn-sm btn-society-red" onClick={() => handleAssignResident(flat)}>Assign</button></div></td>
                </tr>
              ))}
              {flats.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No flats added yet.
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

export default ManageFlats;
