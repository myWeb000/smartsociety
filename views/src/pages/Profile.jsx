import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();
  return <div><div className="mb-4"><h2 className="fw-bold mb-1">User Profile</h2><p className="text-muted mb-0">Account details returned by the authentication API.</p></div><div className="society-card"><div className="row g-3"><div className="col-4 text-muted fw-semibold">Full name</div><div className="col-8 fw-bold">{currentUser?.name}</div><div className="col-4 text-muted fw-semibold">Email</div><div className="col-8">{currentUser?.email}</div><div className="col-4 text-muted fw-semibold">Phone</div><div className="col-8">{currentUser?.phone || 'Not set'}</div><div className="col-4 text-muted fw-semibold">Role</div><div className="col-8">{currentUser?.role}</div><div className="col-4 text-muted fw-semibold">Flat ID</div><div className="col-8">{currentUser?.flat_id || 'Not assigned'}</div></div></div></div>;
};
export default Profile;
