import React from 'react';
import { useAuth } from '../context/AuthContext';

const HouseCard = ({ house, onDelete, onEdit, showActions = false }) => {
  const { user } = useAuth();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleContact = () => {
    if (house.contact) {
      window.open(`tel:${house.contact}`, '_self');
    }
  };

  return (
    <div className="card">
      <img 
        src={house.imageUrl || "https://via.placeholder.com/200"} 
        alt={house.title}
        className="card-image"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/200x200?text=House+Image";
        }}
      />
      
      <div className="card-content">
        <h3 className="card-title">{house.title}</h3>
        <p className="card-subtitle">
          📍 {house.location} • 🛏️ {house.bedrooms} BHK
        </p>
        <p className="card-description">{house.description}</p>
        
        {house.owner && (
          <div style={{ marginBottom: '1rem', color: '#666', fontSize: '0.9rem' }}>
            <strong>Owner:</strong> {house.owner.name}
          </div>
        )}
      </div>

      <div className="card-footer">
        <div className="price">{formatPrice(house.price)}/month</div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {!showActions && user?.role === 'tenant' && (
            <button 
              onClick={handleContact}
              className="btn btn-primary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
            >
              📞 Contact
            </button>
          )}
          
          {showActions && user?.role === 'owner' && (
            <>
              <button 
                onClick={() => onEdit(house)}
                className="btn btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
              >
                ✏️ Edit
              </button>
              <button 
                onClick={() => onDelete(house._id)}
                className="btn btn-danger"
                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
              >
                🗑️ Delete
              </button>
            </>
          )}
        </div>
      </div>

      {house.available === false && (
        <div 
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: '#dc3545',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '3px',
            fontSize: '0.8rem',
            fontWeight: 'bold'
          }}
        >
          UNAVAILABLE
        </div>
      )}
    </div>
  );
};

export default HouseCard; 