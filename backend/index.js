const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const cors = require('cors'); // Import CORS
require('dotenv').config();

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3001', // Allow requests from frontend
  methods: 'GET,POST,PUT,DELETE', // Allowed methods
  credentials: true, // Include credentials in requests
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));