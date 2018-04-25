// jshint esversion: 6

// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const config = require('./server/config.js');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


// Set our api routes
app.use('/api', api);

//Redirect URI
app.get('/oauth-callback', (req, res) => {
    res.sendFile(path.join(__dirname, 'external/oauth-callback.html'));
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
// const port = process.env.PORT || '3000';
app.set('port', config.PORT);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(config.PORT, () => console.log(`App running on localhost:${config.PORT}`));