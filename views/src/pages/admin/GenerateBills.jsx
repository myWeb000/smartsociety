import React, { useState } from 'react';
import Swal from 'sweetalert2';
import StatusBadge from '../../components/StatusBadge';
import { useData } from '../../context/DataContext';
import { getErrorMessage } from '../../api/client';

const GenerateBills = () => {
  const { bills, flats, generateBill } = useData();

  const [selectedFlat, setSelectedFlat] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleGenerateBill = async (e) => {
    e.preventDefault();

    if (!selectedFlat) {
      Swal.fire({
        icon: 'error',
        title: 'Flat Required',
        text: 'Please select a flat number.',
        confirmButtonColor: '#dc3545'
      });
      return;
    }

    if (!amount || Number(amount) <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Valid Amount Required',
        text: 'Please enter a valid bill amount greater than 0.',
        confirmButtonColor: '#dc3545'
      });
      return;
    }

    if (!dueDate) {
      Swal.fire({
        icon: 'error',
        title: 'Due Date Required',
        text: 'Please select a due date for the bill.',
        confirmButtonColor: '#dc3545'
      });
      return;
    }

    try {
    const newBill = await generateBill({
      flatId: selectedFlat,
      amount: Number(amount),
      dueDate
    });

    Swal.fire({
      icon: 'success',
      title: 'Bill Generated Successfully!',
      html: `Bill <strong>${newBill.id}</strong> of <strong>₹${amount}</strong> generated for Flat <strong>${selectedFlat}</strong>.`,
      confirmButtonColor: '#dc3545'
    });

    // Reset Form
    setAmount('');
    setDueDate('');
    } catch (error) { Swal.fire({ icon: 'error', title: 'Could not generate bill', text: getErrorMessage(error) }); }
  };

  return (
    <div className="admin-page">
      {/* Page Header */}
      <div className="admin-page-header mb-4"><span className="admin-eyebrow">BILLING CENTRE</span>
        <h2 className="fw-bold mb-1">Generate & manage bills</h2>
        <p className="text-muted mb-0">Create new maintenance and utility bills for society residents.</p>
      </div>

      {/* Bill Generation Form Card */}
      <div className="society-card admin-form-card mb-4">
        <div className="society-card-header">
          <h3 className="society-card-title"><i className="fa-solid fa-file-circle-plus" /> Create a new bill</h3>
        </div>
        <form onSubmit={handleGenerateBill}>
          <div className="row g-3">
            <div className="col-12 col-md-3">
              <label className="form-label fw-semibold small text-secondary">
                SELECT FLAT <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                value={selectedFlat}
                onChange={(e) => setSelectedFlat(e.target.value)}
              >
                {flats.map((f) => (
                  <option key={f.id} value={f.id}>
                    Flat {f.flatNumber} ({f.block}) - {f.resident}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label fw-semibold small text-secondary">
                AMOUNT (₹) <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                min="1"
                className="form-control"
                placeholder="e.g. 4500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label fw-semibold small text-secondary">
                DUE DATE <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="col-12 d-flex justify-content-end mt-4">
              <button type="submit" className="btn btn-society-red">
                <i className="fa-solid fa-money-bill"></i> Generate Bill
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Generated Bills Table */}
      <div className="society-card">
        <div className="society-card-header">
          <h3 className="society-card-title">All Generated Bills ({bills.length})</h3>
        </div>
        <div className="table-responsive">
          <table className="society-table">
            <thead>
              <tr>
                <th>Bill ID</th>
                <th>Flat Number</th>
                <th>Resident</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr key={bill.id}>
                  <td className="fw-bold">{bill.id}</td>
                  <td>Flat {bill.flatNumber}</td>
                  <td>{bill.resident}</td>
                  <td className="fw-bold text-dark">₹{bill.amount}</td>
                  <td>{bill.dueDate}</td>
                  <td>
                    <StatusBadge status={bill.status} />
                  </td>
                </tr>
              ))}
              {bills.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No bills generated yet.
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

export default GenerateBills;
