require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const connectDatabase = require('./config/db');

// Route imports
const authRoutes = require('./routes/auth.routes');
const itemRoutes = require('./routes/item.routes');
const paymentRoutes = require('./routes/payment.routes');

const serverApp = express();

// Middlewares setup
serverApp.use(express.json());
serverApp.use(cors());

// Ensure the 'uploads' directory exists for multer files
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Serve uploaded files statically
serverApp.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
connectDatabase();

// Base route for testing
serverApp.get('/status', (req, res) => {
    res.status(200).json({ message: 'Main Application Interface is active and listening.' });
});

// Setting up the API routes
serverApp.use('/api/v1/auth', authRoutes);
serverApp.use('/api/v1/items', itemRoutes);
serverApp.use('/api/v1/payments', paymentRoutes);

// Server instantiation
const PORT_NUMBER = process.env.PORT || 5000;
serverApp.listen(PORT_NUMBER, () => {
    console.log(`🚀 API Server up and running on mode on port ${PORT_NUMBER}`);
});
