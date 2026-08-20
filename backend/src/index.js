const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const pool = require('./config/db');
const logger = require('./utils/logger');

// Import routes
const todoRoutes = require('./routes/todoRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Morgan middleware for HTTP request logging
const morganFormat = ':method :url :status :res[content-length] - :response-time ms';
app.use(morgan(morganFormat, {
  // Send Morgan logs through Winston
  stream: {
    write: (message) => logger.info(message.trim()),
  },
}));

// Routes
app.use('/api/todos', todoRoutes);

// Test route
app.get('/api/test', (req, res) => {
  logger.info('Test endpoint called');
  res.json({ message: 'Backend is running!' });
});

// Test database connection: curl http://localhost:5000/api/db-test
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    logger.info('Database connection successful', {
      timestamp: result.rows[0],
    });
    res.json({ 
      message: 'Database connected!',
      time: result.rows[0]
    });
  } catch (err) {
    logger.error('Database connection failed', {
      error: err.message,
      code: err.code,
    });
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info('✅ Server started successfully', {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', {
    promise: promise,
    reason: reason.message || reason,
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', {
    error: error.message,
    stack: error.stack,
  });
  process.exit(1);
});