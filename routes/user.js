const express = require('express');
const router = express.Router();

// middleware
const { isUser } = require('../middleware');

// Controller
const { renderApplieds, renderRegister, register, renderLogin, login, logout, renderApply, apply } = require('../controllers/user');

// render all applied position/job
router.get('/', isUser, renderApplieds);

// render register
router.get('/register', renderRegister);

// register
router.post('/register', register);

// render login
router.get('/login', renderLogin);

// login
router.post('/login', login);

// logout
router.get('/logout', logout);

// render apply page
router.get('/:jobId', isUser, renderApply);

// apply
router.post('/:jobId', isUser, apply);

module.exports = router;