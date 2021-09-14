const express = require('express');
const router = express.Router();

// Controller
const { renderJobs } = require('../controllers/job');

// index page
router.get('/', renderJobs);

module.exports = router;