// Dependencies
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// import api routes
const userRoute = require('../routes/api/user');

// Init express app
const app = express();

// Use morgan to log all requests
app.use(logger('dev'));

// Body Parser Middleware
app.use(express.json({ extended: true }));

// Cors middleware
app.use(cors());

// init routes for express to use
app.use('/api/v1/users', userRoute);

// Export app to for server to use
module.exports = app;
