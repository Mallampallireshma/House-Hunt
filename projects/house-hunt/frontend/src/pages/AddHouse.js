import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { housesAPI } from '../services/api';

const AddHouse = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    bedrooms: '',
    description: '',
    imageUrl: '',
    contact: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not owner
  React.useEffect(() => {
    if (user && user.role !== 'owner') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!formData.title || !formData.location || !formData.price || 
        !formData.bedrooms || !formData.description || !formData.contact) {
      return 'Please fill in all required fields';
    }

    if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      return 'Please enter a valid price';
    }

    if (isNaN(formData.bedrooms) || parseInt(formData.bedrooms) <= 0) {
      return 'Please enter a valid number of bedrooms';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const houseData = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms),
        imageUrl: formData.imageUrl || "https://via.placeholder.com/200",
      };

      await housesAPI.createHouse(houseData);
      setSuccess('Property listed successfully!');
      
      // Reset form
      setFormData({
        title: '',
        location: '',
        price: '',
        bedrooms: '',
        description: '',
        imageUrl: '',
        contact: '',
      });

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'owner') {
    return (
      <div className="container">
        <div className="alert alert-error">
          You must be logged in as an owner to access this page.
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Add New Property</h2>
        
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Property Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., 2BHK Apartment"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location" className="form-label">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Hyderabad, Mumbai, Delhi"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price" className="form-label">
              Monthly Rent (₹) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., 12000"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bedrooms" className="form-label">
              Number of Bedrooms *
            </label>
            <select
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select bedrooms</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
              <option value="5">5+ BHK</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Describe your property, amenities, nearby facilities..."
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl" className="form-label">
              Image URL (Optional)
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="form-input"
              placeholder="https://example.com/house-image.jpg"
            />
            <small style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem', display: 'block' }}>
              If not provided, a placeholder image will be used
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="contact" className="form-label">
              Contact Number *
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="form-input"
              placeholder="Your contact number"
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ flex: 1 }}
            >
              {loading ? (
                <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
              ) : (
                'List Property'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHouse; 