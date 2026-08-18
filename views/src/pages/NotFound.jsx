import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <div className="society-card text-center py-5 px-4" style={{ maxWidth: '500px' }}>
        <h1
          style={{
            fontSize: '5rem',
            fontWeight: '900',
            color: '#dc3545',
            lineHeight: 1,
            marginBottom: '1rem'
          }}
        >
          404
        </h1>
        <h2 className="fw-bold mb-2">Page Not Found</h2>
        <p className="text-muted mb-4">
          The page you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="btn btn-society-red px-4 py-2"
        >
          ← Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
