const express = require('express');
const router = express.Router();

const { ADMIN_USERNAME, ADMIN_PASSWORD } = require('../utils/config');

// Middleware
const { isAdmin } = require('../middleware');

// Model
const Job = require('../models/Job');
const Application = require('../models/Application');

// helper
const { flashMessage } = require('../utils/helper'); 

// render admin login page
router.get('/', (req, res) => {
  res.render('admin/index')
});

// admin login
router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.redirect('/');
  }
  req.session.isAdmin = true;
  res.redirect('/');
});

// render add job page
router.get('/add', isAdmin, (req, res) => {
  res.render('admin/add');
});

// add a new job
router.post('/add', isAdmin, async (req, res, next) => {
  try {
    const job = new Job(req.body);
    await job.save();
    flashMessage('success', 'Add job successfully', "/admin/add", req, res);
  } catch (error) {
    next(error);
  }
});

// Not finish.....................######
router.get('/applied', isAdmin, async(req, res, next) => {
  try {
    const applications = await Application.find()
      .populate("user", ['firstName', 'lastName'])
      .populate('job', 'position');

    res.render('admin/applied', {applications});
  } catch (error) {
    next(error);
  }
});

// admin logout
router.get('/logout', (req, res) => {
  req.session.isAdmin = false;
  res.redirect('/');
});

module.exports = router;