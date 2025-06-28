# 🏠 House Hunt - Property Rental Platform

A full-stack web application for property rentals, connecting property owners with tenants. Built with Node.js, React, and MongoDB.

## 🚀 Features

### For Property Owners
- **User Registration & Authentication** - Secure login system with JWT
- **Property Management** - Add, edit, and delete property listings
- **Dashboard** - View and manage all your listings
- **Property Details** - Add comprehensive property information including images

### For Tenants
- **Property Search** - Search properties by location
- **Location-based Listings** - View properties based on your preferred location
- **Property Browsing** - Browse detailed property listings with images
- **Direct Contact** - Contact property owners directly

### General Features
- **Role-based Access** - Separate interfaces for owners and tenants
- **Responsive Design** - Works on desktop and mobile devices
- **Real-time Data** - Live property listings and updates
- **Modern UI** - Clean, intuitive interface with CSS styling

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Router for navigation
- Axios for API calls
- Context API for state management
- CSS3 for styling

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## 📋 Prerequisites

Before running this application, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)
- [Git](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd house-hunt
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create environment variables:
Create a `.env` file in the backend directory with the following variables:
```env
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/househunt

# JWT Secret - Change this to a secure random string in production
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Client URL for CORS
CLIENT_URL=http://localhost:3000
```

Start the backend server:
```bash
# Development mode with auto-restart
npm run dev

# OR Production mode
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Create environment variables:
Create a `.env` file in the frontend directory with the following variables:
```env
# React App Environment Variables
# Note: Variables must be prefixed with REACT_APP_ to be accessible in the browser

# Backend API URL
REACT_APP_API_URL=http://localhost:5000/api

# App Configuration
REACT_APP_NAME=House Hunt
REACT_APP_VERSION=1.0.0

# Development settings
GENERATE_SOURCEMAP=true
```

Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🎯 Usage Guide

### Getting Started

1. **Open your browser** and go to `http://localhost:3000`
2. **Register** as either an Owner or Tenant
3. **Login** with your credentials

### For Property Owners

1. **Dashboard**: View your property statistics and listings
2. **Add Property**: Click "Add Property" to list a new rental
3. **Manage Listings**: Edit or delete your existing properties
4. **View Applications**: See tenant interest in your properties

### For Tenants

1. **Browse Properties**: View available properties in your area
2. **Search by Location**: Filter properties by specific locations
3. **Contact Owners**: Directly contact property owners
4. **Save Favorites**: Keep track of properties you're interested in

## 📁 Project Structure

```
house-hunt/
├── backend/
│   ├── config/
│   │   └── db.js              # Database connection
│   │   └── middleware/
│   │   │   └── auth.js            # Authentication middleware
│   │   ├── models/
│   │   │   ├── User.js            # User model (Owner/Tenant)
│   │   │   └── House.js           # Property model
│   │   ├── routes/
│   │   │   ├── auth.js            # Authentication routes
│   │   │   └── houses.js          # Property routes
│   │   ├── server.js              # Main server file
│   │   └── package.json
│   └── frontend/
│       ├── public/
│       │   └── index.html
│       ├── src/
│       │   ├── components/
│       │   │   ├── Header.js      # Navigation component
│       │   │   └── HouseCard.js   # Property card component
│       │   ├── context/
│       │   │   └── AuthContext.js # Authentication context
│       │   ├── pages/
│       │   │   ├── Login.js       # Login page
│       │   │   ├── Register.js    # Registration page
│       │   │   ├── Dashboard.js   # Main dashboard
│       │   │   └── AddHouse.js    # Add property form
│       │   ├── services/
│       │   │   └── api.js         # API service layer
│       │   ├── styles/
│       │   │   └── global.css     # Global styles
│       │   ├── App.js             # Main app component
│       │   └── index.js           # React entry point
│       └── package.json
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Properties
- `GET /api/houses` - Get all houses (with filters)
- `GET /api/houses/:id` - Get single house
- `GET /api/houses/my-listings` - Get owner's listings
- `POST /api/houses` - Create new house (Owner only)
- `PUT /api/houses/:id` - Update house (Owner only)
- `DELETE /api/houses/:id` - Delete house (Owner only)

## 🎨 Sample Data

Here's the house schema used in the application:

```javascript
{
  "title": "2BHK Apartment",
  "location": "Hyderabad",
  "price": 12000,
  "bedrooms": 2,
  "description": "Spacious flat near Metro",
  "imageUrl": "https://via.placeholder.com/200",
  "contact": "9876543210"
}
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Passwords encrypted with bcryptjs
- **Role-based Access** - Separate permissions for owners and tenants
- **Input Validation** - Server-side validation for all inputs
- **CORS Protection** - Cross-origin request security

## 🚦 Development

### Running in Development Mode

Backend (with auto-restart):
```bash
cd backend
npm run dev
```

Frontend (with hot reload):
```bash
cd frontend
npm start
```

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

**Frontend:**
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🌐 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Ensure MongoDB is accessible
3. Set `NODE_ENV=production`
4. Deploy using services like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Run `npm run build` in the frontend directory
2. Deploy the `build` folder to services like Netlify, Vercel, or AWS S3

## 📝 Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
CLIENT_URL=your-frontend-url
```

### Frontend (.env)
```env
# React App Environment Variables
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NAME=House Hunt
REACT_APP_VERSION=1.0.0
GENERATE_SOURCEMAP=true
```

**Note:** In React, environment variables must be prefixed with `REACT_APP_` to be accessible in the browser.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the MONGODB_URI in your .env file

2. **CORS Errors**
   - Verify CLIENT_URL in backend .env matches frontend URL
   - Check if both servers are running

3. **Authentication Issues**
   - Clear browser localStorage
   - Verify JWT_SECRET is set in backend

4. **Port Already in Use**
   - Kill existing processes on ports 3000 and 5000
   - Or change ports in package.json

### Getting Help

If you encounter any issues:
1. Check the browser console for errors
2. Check the backend server logs
3. Ensure all dependencies are installed
4. Verify environment variables are set correctly

---

Built with ❤️ for seamless property rentals. Happy house hunting! 🏠 