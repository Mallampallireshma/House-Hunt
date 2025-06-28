import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            🏠 House Hunt
          </Link>

          {isAuthenticated ? (
            <nav className="nav-menu">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              
              {user?.role === 'owner' && (
                <>
                  <Link to="/my-listings" className="nav-link">
                    My Listings
                  </Link>
                  <Link to="/add-house" className="nav-link">
                    Add Property
                  </Link>
                </>
              )}
              
              {user?.role === 'tenant' && (
                <Link to="/browse" className="nav-link">
                  Browse Houses
                </Link>
              )}

              <div className="user-info">
                <span className="user-badge">
                  {user?.name} ({user?.role})
                </span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </nav>
          ) : (
            <nav className="nav-menu">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 