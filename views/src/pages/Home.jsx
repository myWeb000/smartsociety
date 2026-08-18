import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 px-4">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
            <span
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#121417',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                marginRight: '12px',
                fontSize: '1.2rem',
              }}
            >
              <i className="fa-solid fa-building"></i>
            </span>
            <span style={{ fontSize: '1.4rem' }}>
              SOCIETY<span style={{ color: '#dc3545' }}> HUB</span>
            </span>
          </Link>
          <div className="ms-auto d-flex gap-3">
            <Link to="/login" className="btn btn-outline-dark px-4 fw-bold rounded-pill">
              Login
            </Link>
            <Link to="/signup" className="btn btn-danger px-4 fw-bold rounded-pill">
              Create Account
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow-1 bg-light d-flex align-items-center">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <span className="badge bg-danger-subtle text-danger mb-3 px-3 py-2 rounded-pill fw-bold">
                #1 Society Management Software
              </span>
              <h1 className="display-4 fw-bold mb-4" style={{ color: '#1e2125' }}>
                Manage Your <span style={{ color: '#dc3545' }}>Society</span> With Complete Ease.
              </h1>
              <p className="lead text-secondary mb-5" style={{ fontSize: '1.2rem' }}>
                A smart, all-in-one platform for flat owners, admins, and security guards. Streamline bills, visitor passes, complaints, and amenities seamlessly.
              </p>
              <div className="d-flex gap-3">
                <Link to="/signup" className="btn btn-danger btn-lg px-5 py-3 fw-bold rounded-pill shadow-sm">
                  Get Started for Free
                </Link>
                <Link to="/login" className="btn btn-white btn-lg px-5 py-3 fw-bold rounded-pill border bg-white shadow-sm">
                  Member Login
                </Link>
              </div>
              <div className="mt-4 d-flex align-items-center gap-2 text-secondary">
                <span><i className="fa-solid fa-star text-warning"></i> 4.9/5 from 500+ societies</span>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="position-relative">
                <div 
                  className="bg-white p-4 rounded-4 shadow-lg border"
                  style={{
                    transform: 'rotate(2deg)',
                    zIndex: 2,
                    position: 'relative'
                  }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Modern Building" 
                    className="img-fluid rounded-3 mb-3"
                    style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                  />
                  <div className="d-flex align-items-center justify-content-between px-2">
                    <div>
                      <h5 className="mb-0 fw-bold">Smart Security & Billing</h5>
                      <p className="text-muted small mb-0">Fully automated operations</p>
                    </div>
                    <span className="badge bg-success">Verified</span>
                  </div>
                </div>
                
                {/* Decorative blob behind the card */}
                <div 
                  className="position-absolute bg-danger opacity-25 rounded-circle blur-3"
                  style={{
                    width: '300px', height: '300px', top: '-20px', right: '-20px', zIndex: 0, filter: 'blur(60px)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 border-top text-center text-secondary">
        <div className="container">
          <small>&copy; {new Date().getFullYear()} Society Hub. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
};

export default Home;
