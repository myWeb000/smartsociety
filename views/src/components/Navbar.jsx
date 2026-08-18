import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ pageTitle, onToggleSidebar }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate('/');
      }
    });
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'Admin':
        return 'role-badge-admin';
      case 'Resident':
        return 'role-badge-resident';
      case 'Guard':
        return 'role-badge-guard';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <header className="top-navbar">
      <div className="d-flex align-items-center gap-3">
        {/* Mobile Toggle Button */}
        <button
          className="btn btn-sm btn-outline-secondary d-lg-none"
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation"
        >
          ☰
        </button>

        {/* Page Title */}
        <h1 className="page-title-text">{pageTitle}</h1>
      </div>

      {/* User Info & Actions */}
      <div className="d-flex align-items-center gap-3">
        <div className="d-none d-sm-flex align-items-center gap-2">
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#212529',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '0.9rem'
            }}
          >
            {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: '600', lineHeight: 1.2 }}>
              {currentUser?.name || 'User'}
            </div>
            <span className={`badge ${getRoleBadgeClass(currentUser?.role)}`} style={{ fontSize: '0.7rem' }}>
              {currentUser?.role || 'Guest'}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
          title="Logout"
        >
          <span><i className="fa-solid fa-arrow-right-from-bracket"></i></span>
          <span className="d-none d-md-inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
