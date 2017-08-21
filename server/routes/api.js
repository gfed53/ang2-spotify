// jshint esversion: 6

const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');

const config = require('../config');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

//Get our API key(s)
router.get('/access', (req, res) => {
    res.json(config.KEYS);
});

module.exports = router;