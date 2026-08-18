import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem('society_token');

  // Check if no user OR no token exists
  if (!currentUser || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if role is authorized
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // If not authorized for this route, redirect them to their own dashboard
    const roleRoutes = {
      'Admin': '/admin/dashboard',
      'Resident': '/resident/dashboard',
      'Guard': '/guard/dashboard'
    };
    return <Navigate to={roleRoutes[currentUser.role] || "/login"} replace />;
  }

  // Authorized
  return <Outlet />;
};

export default ProtectedRoute;
