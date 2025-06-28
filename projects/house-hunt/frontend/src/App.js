import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddHouse from './pages/AddHouse';
import './styles/global.css';

// Protected Route component
const ProtectedRoute = ({ children, ownerOnly = false }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (ownerOnly && user?.role !== 'owner') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Home page component
const Home = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="container">
      <div style={{ 
        textAlign: 'center', 
        padding: '4rem 2rem',
        background: 'white',
        borderRadius: '10px',
        margin: '2rem 0',
        boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          🏠 House Hunt
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#666', 
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          Find your perfect rental home or list your property for rent. 
          Connect property owners with tenants seamlessly.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/register" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Get Started
          </a>
          <a href="/login" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            Login
          </a>
        </div>

        <div style={{ 
          marginTop: '3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          textAlign: 'left'
        }}>
          <div style={{ padding: '1.5rem', border: '1px solid #e9ecef', borderRadius: '8px' }}>
            <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>🏠 For Property Owners</h3>
            <ul style={{ color: '#666', lineHeight: '1.8' }}>
              <li>List your properties easily</li>
              <li>Manage all listings in one place</li>
              <li>Connect with verified tenants</li>
            </ul>
          </div>
          
          <div style={{ padding: '1.5rem', border: '1px solid #e9ecef', borderRadius: '8px' }}>
            <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>🔍 For Tenants</h3>
            <ul style={{ color: '#666', lineHeight: '1.8' }}>
              <li>Search by location and preferences</li>
              <li>Browse detailed property listings</li>
              <li>Contact owners directly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App component
const AppContent = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingBottom: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-house" 
            element={
              <ProtectedRoute ownerOnly>
                <AddHouse />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-listings" 
            element={
              <ProtectedRoute ownerOnly>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/browse" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      <footer style={{ 
        textAlign: 'center', 
        padding: '2rem', 
        background: '#f8f9fa',
        borderTop: '1px solid #e9ecef',
        color: '#666'
      }}>
        <p>&copy; 2024 House Hunt. Built with ❤️ for seamless property rentals.</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App; 