import React from 'react';
import Swal from 'sweetalert2';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const MyBills = () => {
  const { currentUser } = useAuth();
  const { bills, payBill } = useData();

  const userFlat = currentUser?.flatNumber || '101';
  const myBills = bills.filter((b) => b.flatNumber === userFlat);

  const handlePayNow = (bill) => {
    Swal.fire({
      title: 'Pay Bill (Simulated)',
      html: `
        <div style="text-align: left; font-size: 0.95rem;">
          <p><strong>Bill ID:</strong> ${bill.id}</p>
          <p><strong>Type:</strong> ${bill.type}</p>
          <p><strong>Amount:</strong> ₹${bill.amount}</p>
          <p><strong>Due Date:</strong> ${bill.dueDate}</p>
          <hr />
          <p class="text-muted small">This is a simulated demo payment. No actual bank or payment gateway is involved.</p>
        </div>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Confirm & Pay'
    }).then((result) => {
      if (result.isConfirmed) {
        payBill(bill.id);
        Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          text: `Bill ${bill.id} marked as Paid.`,
          confirmButtonColor: '#dc3545'
        });
      }
    });
  };

  return (
    <div className="resident-page">
      {/* Page Header */}
      <div className="portal-page-header resident-header mb-4">
        <h2 className="fw-bold mb-1">My Society Bills</h2>
        <p className="text-muted mb-0">View all maintenance and utility bills issued for Flat {userFlat}.</p>
      </div>

      {/* Bills Summary Header */}
      <div className="row g-3 mb-4 portal-stat-grid">
        <div className="col-12 col-md-4">
          <div className="society-card mb-0">
            <div className="stat-label">Total Bills</div>
            <div className="stat-value">{myBills.length}</div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="society-card mb-0" style={{ borderLeft: '4px solid #ffc107' }}>
            <div className="stat-label">Pending Payments</div>
            <div className="stat-value text-warning">
              {myBills.filter((b) => b.status === 'Pending').length}
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="society-card mb-0" style={{ borderLeft: '4px solid #198754' }}>
            <div className="stat-label">Paid Bills</div>
            <div className="stat-value text-success">
              {myBills.filter((b) => b.status === 'Paid').length}
            </div>
          </div>
        </div>
      </div>

      {/* Bills Table */}
      <div className="society-card">
        <div className="society-card-header">
          <h3 className="society-card-title">Billing History</h3>
        </div>
        <div className="table-responsive">
          <table className="society-table">
            <thead>
              <tr>
                <th>Bill ID</th>
                <th>Bill Description</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {myBills.map((bill) => (
                <tr key={bill.id}>
                  <td className="fw-bold">{bill.id}</td>
                  <td>{bill.type}</td>
                  <td className="fw-bold text-dark">₹{bill.amount}</td>
                  <td>{bill.dueDate}</td>
                  <td>
                    <StatusBadge status={bill.status} />
                  </td>
                  <td className="text-end">
                    {bill.status === 'Paid' ? (
                      <button className="btn btn-sm btn-outline-success" disabled>
                        ✓ Paid
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-society-red"
                        onClick={() => handlePayNow(bill)}
                      >
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {myBills.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No bills generated for Flat {userFlat}.
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

export default MyBills;
