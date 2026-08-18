import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Determine current page title based on path
  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/admin/dashboard':
        return 'Admin Dashboard';
      case '/admin/flats':
        return 'Manage Flats & Residents';
      case '/admin/bills':
        return 'Generate & Manage Bills';
      case '/admin/complaints':
        return 'Complaints Management';
      case '/resident/dashboard':
        return 'Resident Dashboard';
      case '/resident/bills':
        return 'My Society Bills';
      case '/resident/complaint':
        return 'Lodge a Complaint';
      case '/resident/amenity':
        return 'Amenity Booking';
      case '/resident/visitor-pass':
        return 'Generate Visitor Gate Pass';
      case '/guard/dashboard':
      case '/guard/active-visitors':
        return 'Active Society Visitors';
      case '/guard/verify-pass':
        return 'Verify Visitor Pass';
      case '/guard/walk-in':
        return 'Register Walk-In Visitor';
      case '/profile':
        return 'User Profile';
      default:
        return 'Society Management';
    }
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="app-container">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="main-wrapper">
        <Navbar
          pageTitle={pageTitle}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
        
        <main className="content-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
