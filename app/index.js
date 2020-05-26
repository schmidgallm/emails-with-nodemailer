// Dependencies
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// Init express app
const app = express();

// Use morgan to log all requests
app.use(logger('dev'));

// Body Parser Middleware
app.use(express.json({ extended: true }));

// Cors middleware
app.use(cors());

// Export app to for server to use
module.exports = app;
