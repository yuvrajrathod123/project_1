const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Define log format
// This is how logs will look when written to files
const logFormat = winston.format.combine(
  // Add timestamp to each log
  winston.format.timestamp({ 
    format: 'YYYY-MM-DD HH:mm:ss' 
  }),
  // Include stack trace for errors
  winston.format.errors({ stack: true }),
  // Custom format: [timestamp] [LEVEL] message data
  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    let logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    // If there's additional data, include it
    if (Object.keys(meta).length > 0) {
      logMessage += ` | ${JSON.stringify(meta)}`;
    }
    
    return logMessage;
  })
);

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info', // Minimum level to log
  format: logFormat,
  defaultMeta: { service: 'todo-api' },
  transports: [
    // Error logs - only ERROR level
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5, // Keep 5 files
    }),
    
    // App logs - INFO, WARNING, DEBUG (no errors)
    new winston.transports.File({
      filename: path.join(logsDir, 'app.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    
    // Combined logs - everything
    new winston.transports.File({
      filename: path.join(logsDir, 'combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 10, // Keep more combined logs
    }),
  ],
});

// In development, also log to console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(), // Add colors to console
      logFormat
    ),
  }));
}

module.exports = logger;