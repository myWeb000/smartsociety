import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useData } from '../../context/DataContext';
import { getErrorMessage } from '../../api/client';

const VerifyPass = () => {
  const { verifyPass } = useData();
  const [passCode, setPassCode] = useState('');
  const [verifiedPass, setVerifiedPass] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!passCode.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Pass Code Required',
        text: 'Please enter the 4-digit or 5-digit gate pass code.',
        confirmButtonColor: '#dc3545'
      });
      return;
    }

    try { const result = await verifyPass(passCode.trim());

    if (result.success) {
      setVerifiedPass(result.pass);

      Swal.fire({
        icon: 'success',
        title: 'Pass Verified — Allow Entry!',
        html: `
          <div style="text-align: left; font-size: 0.95rem;">
            <p><strong>Visitor:</strong> ${result.pass.visitorName}</p>
            <p><strong>Destination:</strong> Flat ${result.pass.flat}</p>
            <p><strong>Vehicle:</strong> ${result.pass.vehicle || 'None'}</p>
          </div>
        `,
        confirmButtonColor: '#198754',
        confirmButtonText: 'Grant Entry & Record'
      });

      // Clear input
      setPassCode('');
    }
    } catch (error) { setVerifiedPass(null); Swal.fire({ icon: 'error', title: 'Invalid or expired pass', text: getErrorMessage(error) }); }
  };

  return (
    <div className="guard-page">
      {/* Page Header */}
      <div className="portal-page-header guard-header mb-4">
        <h2 className="fw-bold mb-1">Verify Gate Pass</h2>
        <p className="text-muted mb-0">Verify resident-generated visitor pass codes before granting society gate entry.</p>
      </div>

      <div className="row g-4 justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          {/* Code Entry Card */}
          <div className="society-card portal-form-card text-center py-4">
            <div
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#121417',
                color: '#fff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                fontSize: '1.8rem'
              }}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <h3 className="fw-bold mb-2">Enter Gate Pass Code</h3>
            <p className="text-muted small mb-4">Ask the visitor for their pass code provided by the resident.</p>

            <form onSubmit={handleVerify} className="px-lg-4">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control text-center fw-bold"
                  placeholder="e.g. X9K2 or A7B9X"
                  style={{
                    fontSize: '1.8rem',
                    letterSpacing: '6px',
                    height: '60px',
                    textTransform: 'uppercase'
                  }}
                  value={passCode}
                  onChange={(e) => setPassCode(e.target.value.toUpperCase())}
                  maxLength={6}
                />
              </div>

              <button
                type="submit"
                className="btn btn-society-red w-100 py-3 fw-bold"
                style={{ fontSize: '1.1rem' }}
              >
                Verify Pass Code
              </button>
            </form>
          </div>

          {/* Verified Details Card */}
          {verifiedPass && (
            <div className="society-card border-success mt-4">
              <div className="society-card-header bg-success text-white py-2 px-3 rounded-top">
                <h4 className="m-0 fw-bold fs-6"><i className="fa-solid fa-check text-success"></i> PASS VERIFIED — ALLOW ENTRY</h4>
              </div>
              <div className="p-3">
                <div className="row g-2">
                  <div className="col-6 text-muted">Visitor Name:</div>
                  <div className="col-6 fw-bold">{verifiedPass.visitorName}</div>

                  <div className="col-6 text-muted">Phone Number:</div>
                  <div className="col-6 fw-bold">{verifiedPass.phone}</div>

                  <div className="col-6 text-muted">Destination Flat:</div>
                  <div className="col-6 fw-bold">Flat {verifiedPass.flat}</div>

                  <div className="col-6 text-muted">Vehicle Number:</div>
                  <div className="col-6 fw-bold">{verifiedPass.vehicle || 'None'}</div>

                  <div className="col-6 text-muted">Status:</div>
                  <div className="col-6 text-success fw-bold">Active in Society</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyPass;
