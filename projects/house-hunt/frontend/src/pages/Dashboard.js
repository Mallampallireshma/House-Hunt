import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { housesAPI } from '../services/api';
import HouseCard from '../components/HouseCard';

const Dashboard = () => {
  const { user } = useAuth();
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchLocation, setSearchLocation] = useState(user?.location || '');

  useEffect(() => {
    fetchHouses();
  }, [user]);

  const fetchHouses = async () => {
    try {
      setLoading(true);
      let response;
      
      if (user?.role === 'owner') {
        // For owners, show their own listings
        response = await housesAPI.getMyListings();
      } else {
        // For tenants, show houses in their location
        const params = user?.location ? { location: user.location } : {};
        response = await housesAPI.getAllHouses(params);
      }
      
      setHouses(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch houses');
      console.error('Error fetching houses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = async () => {
    if (!searchLocation.trim()) return;
    
    try {
      setLoading(true);
      const response = await housesAPI.getAllHouses({ location: searchLocation });
      setHouses(response.data.data || []);
    } catch (err) {
      setError('Failed to search houses');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHouse = async (houseId) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    try {
      await housesAPI.deleteHouse(houseId);
      setHouses(houses.filter(house => house._id !== houseId));
    } catch (err) {
      setError('Failed to delete house');
    }
  };

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

  return (
    <div className="container">
      <div style={{ margin: '2rem 0' }}>
        <h1>
          Welcome, {user?.name}! 
          <span style={{ fontSize: '1rem', color: '#666', marginLeft: '1rem' }}>
            ({user?.role})
          </span>
        </h1>
        
        {user?.role === 'tenant' && (
          <p style={{ color: '#666', marginTop: '0.5rem' }}>
            Find your perfect rental home
          </p>
        )}
        
        {user?.role === 'owner' && (
          <p style={{ color: '#666', marginTop: '0.5rem' }}>
            Manage your property listings
          </p>
        )}
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {/* Search section for tenants */}
      {user?.role === 'tenant' && (
        <div className="search-container">
          <h3 style={{ marginBottom: '1rem' }}>Search Houses</h3>
          <div className="search-filters">
            <div>
              <label className="form-label">Location</label>
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="form-input"
                placeholder="Enter location to search"
              />
            </div>
            <button 
              onClick={handleLocationSearch}
              className="btn btn-primary"
            >
              🔍 Search
            </button>
          </div>
        </div>
      )}

      {/* Action buttons for owners */}
      {user?.role === 'owner' && (
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/add-house" className="btn btn-primary">
            ➕ Add New Property
          </Link>
        </div>
      )}

      {/* Houses grid */}
      <div>
        <h2>
          {user?.role === 'owner' 
            ? `My Listings (${houses.length})` 
            : `Available Houses in ${searchLocation || user?.location} (${houses.length})`
          }
        </h2>

        {houses.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            backgroundColor: 'white', 
            borderRadius: '10px',
            marginTop: '2rem'
          }}>
            <h3 style={{ color: '#666', marginBottom: '1rem' }}>
              {user?.role === 'owner' 
                ? 'No listings yet' 
                : 'No houses found in this location'
              }
            </h3>
            <p style={{ color: '#999' }}>
              {user?.role === 'owner' 
                ? 'Start by adding your first property listing.'
                : 'Try searching for a different location or check back later.'
              }
            </p>
            {user?.role === 'owner' && (
              <Link to="/add-house" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Add Property
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-3">
            {houses.map((house) => (
              <HouseCard
                key={house._id}
                house={house}
                showActions={user?.role === 'owner'}
                onDelete={handleDeleteHouse}
                onEdit={(house) => {
                  // For now, we'll just navigate to edit page
                  window.location.href = `/edit-house/${house._id}`;
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick stats */}
      <div style={{ 
        marginTop: '3rem', 
        padding: '2rem', 
        backgroundColor: 'white', 
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>Quick Stats</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem' 
        }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
              {houses.length}
            </div>
            <div style={{ color: '#666' }}>
              {user?.role === 'owner' ? 'Total Listings' : 'Houses Available'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
              {user?.location}
            </div>
            <div style={{ color: '#666' }}>Your Location</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 