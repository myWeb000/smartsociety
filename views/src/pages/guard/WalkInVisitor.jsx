import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useData } from '../../context/DataContext';
import { getErrorMessage } from '../../api/client';

const WalkInVisitor = () => {
  const { flats, registerWalkInVisitor } = useData();

  const [visitorName, setVisitorName] = useState('');
  const [phone, setPhone] = useState('');
  const [flat, setFlat] = useState('');
  const [vehicle, setVehicle] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!visitorName.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Visitor Name Required',
        text: 'Please enter the visitor full name.',
        confirmButtonColor: '#dc3545'
      });
      return;
    }

    if (!phone.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Phone Number Required',
        text: 'Please enter the contact number.',
        confirmButtonColor: '#dc3545'
      });
      return;
    }

    try { const newEntry = await registerWalkInVisitor({
      flatId: flat,
      visitorName: visitorName.trim(),
      phone: phone.trim(),
      flat,
      vehicle: vehicle.trim() || 'None'
    });

    Swal.fire({
      icon: 'success',
      title: 'Walk-In Visitor Registered!',
      html: `Visitor <strong>${visitorName}</strong> registered for Flat <strong>${flat}</strong>. Entry logged at <strong>${newEntry.entryTime}</strong>.`,
      confirmButtonColor: '#dc3545'
    });

    // Reset Form
    setVisitorName('');
    setPhone('');
    setVehicle('');
    } catch (error) { Swal.fire({ icon: 'error', title: 'Registration failed', text: getErrorMessage(error) }); }
  };

  return (
    <div className="guard-page">
      {/* Page Header */}
      <div className="portal-page-header guard-header mb-4">
        <h2 className="fw-bold mb-1">Register Walk-In Visitor</h2>
        <p className="text-muted mb-0">Record entry for unscheduled visitors, delivery personnel, or service workers at the security gate.</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="society-card portal-form-card">
            <div className="society-card-header">
              <h3 className="society-card-title">Walk-In Visitor Entry Form</h3>
            </div>
            <form onSubmit={handleRegister}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold small text-secondary">
                    VISITOR FULL NAME <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Imran Shah (Delivery)"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold small text-secondary">
                    PHONE NUMBER <span className="text-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold small text-secondary">
                    DESTINATION FLAT <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={flat}
                    onChange={(e) => setFlat(e.target.value)}
                  >
                    {flats.map((f) => (
                      <option key={f.id} value={f.id}>
                        Flat {f.flatNumber} ({f.block}) - {f.resident}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold small text-secondary">
                    VEHICLE NUMBER (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. MH-12-DE-4321 or None"
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                  />
                </div>

                <div className="col-12 d-flex justify-content-end mt-4">
                  <button type="submit" className="btn btn-society-red">
                    <i className="fa-solid fa-person-walking"></i> Register Visitor & Grant Entry
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkInVisitor;
