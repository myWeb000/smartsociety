import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout
import Layout from './components/Layout';

// Auth & Common
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageFlats from './pages/admin/ManageFlats';
import GenerateBills from './pages/admin/GenerateBills';
import ComplaintsManagement from './pages/admin/ComplaintsManagement';

// Resident Pages
import ResidentDashboard from './pages/resident/ResidentDashboard';
import MyBills from './pages/resident/MyBills';
import LodgeComplaint from './pages/resident/LodgeComplaint';
import AmenityBooking from './pages/resident/AmenityBooking';
import GenerateVisitorPass from './pages/resident/GenerateVisitorPass';

// Guard Pages
import ActiveVisitors from './pages/guard/ActiveVisitors';
import VerifyPass from './pages/guard/VerifyPass';
import WalkInVisitor from './pages/guard/WalkInVisitor';


function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Main Authenticated Layout Routes */}
      <Route element={<Layout />}>
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/flats" element={<ManageFlats />} />
        <Route path="/admin/bills" element={<GenerateBills />} />
        <Route path="/admin/complaints" element={<ComplaintsManagement />} />

        {/* Resident Routes */}
        <Route path="/resident/dashboard" element={<ResidentDashboard />} />
        <Route path="/resident/bills" element={<MyBills />} />
        <Route path="/resident/complaint" element={<LodgeComplaint />} />
        <Route path="/resident/amenity" element={<AmenityBooking />} />
        <Route path="/resident/visitor-pass" element={<GenerateVisitorPass />} />

        {/* Guard Routes */}
        <Route path="/guard/dashboard" element={<ActiveVisitors />} />
        <Route path="/guard/active-visitors" element={<ActiveVisitors />} />
        <Route path="/guard/verify-pass" element={<VerifyPass />} />
        <Route path="/guard/walk-in" element={<WalkInVisitor />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* 404 Wildcard Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
