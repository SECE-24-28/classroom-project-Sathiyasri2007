require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');

// Import routes
const userRoutes = require('./routes/userRoutes');
const rechargePlanRoutes = require('./routes/rechargePlanRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'Mobile Recharge Backend API',
    status: 'Server is running successfully',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/recharge-plans', rechargePlanRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});