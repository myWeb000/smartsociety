import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const role = currentUser?.role || 'Admin';

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to log out of your session?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          icon: 'success',
          title: 'Logged Out',
          text: 'You have been successfully logged out.',
          timer: 1500,
          showConfirmButton: false
        });
        navigate('/');
      }
    });
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={onClose} />
      
      <aside className={`sidebar ${isOpen ? 'show' : ''}`}>
        {/* Society Logo / Brand */}
        <div className="sidebar-brand">
          <span style={{ fontSize: '1.4rem' }}><i className="fa-solid fa-building"></i></span>
          <div>
            <span style={{ color: '#ffffff' }}>SOCIETY</span>
            <span className="brand-badge ms-1">PRO</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <ul className="sidebar-menu">
          {/* Admin Navigation */}
          {role === 'Admin' && (
            <>
              <li className="sidebar-item">
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span><i className="fa-solid fa-chart-bar"></i></span> Dashboard
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  to="/admin/flats"
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span><i className="fa-solid fa-house"></i></span> Flats & Residents
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  to="/admin/bills"
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span><i className="fa-solid fa-money-bill"></i></span> Generate Bills
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  to="/admin/complaints"
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span><i className="fa-solid fa-pen-to-square"></i></span> Complaints
                </NavLink>
              </li>
            </>
          )}

          {/* Resident Navigation */}
          {role === 'Resident' && (
            <>
              <li className="sidebar-item">
                <NavLink
                  to="/resident/dashboard"
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span><i className="fa-solid fa-chart-bar"></i></span> Dashboard
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  to="/resident/bills"
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span><i className="fa-solid fa-credit-card"></i></span> My Bills
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  to="/resident/complaint"
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span><i className="fa-solid fa-triangle-exclamation"></i></span> Lodge Complaint
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  to="/resident/amenity"
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span><i className="fa-solid fa-person-swimming"></i></span> Amenity Booking
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  to="/resident/visitor-pass"
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span><i className="fa-solid fa-ticket"></i></span> Visitor Pass
                </NavLink>
              </li>
            </>
          )}

          {/* Guard Navigation */}
          {role === 'Guard' && (
            <>
              <li className="sidebar-item">
                <NavLink
                  to="/guard/active-visitors"
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span><i className="fa-solid fa-clipboard-list"></i></span> Active Visitors
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  to="/guard/verify-pass"
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span><i className="fa-solid fa-magnifying-glass"></i></span> Verify Pass
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  to="/guard/walk-in"
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <span><i className="fa-solid fa-person-walking"></i></span> Walk-In Visitor
                </NavLink>
              </li>
            </>
          )}

          {/* Common Navigation Links */}
          <li className="sidebar-item mt-3 pt-3" style={{ borderTop: '1px solid #2a2e35' }}>
            <NavLink
              to="/profile"
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span><i className="fa-solid fa-user"></i></span> My Profile
            </NavLink>
          </li>
        </ul>

        {/* Sidebar Footer with Logout */}
        <div className="sidebar-footer">
          <button
            onClick={handleLogout}
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
            style={{ fontSize: '0.9rem', color: '#ff6b6b', borderColor: '#495057' }}
          >
            <span><i className="fa-solid fa-arrow-right-from-bracket"></i></span> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
