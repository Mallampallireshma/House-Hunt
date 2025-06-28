import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
};

// Houses API
export const housesAPI = {
  getAllHouses: (params) => api.get('/houses', { params }),
  getHouse: (id) => api.get(`/houses/${id}`),
  getMyListings: () => api.get('/houses/my-listings'),
  createHouse: (houseData) => api.post('/houses', houseData),
  updateHouse: (id, houseData) => api.put(`/houses/${id}`, houseData),
  deleteHouse: (id) => api.delete(`/houses/${id}`),
  getAvailableLocations: () => api.get('/houses/locations/available'),
};

export default api; 