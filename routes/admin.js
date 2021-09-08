const express = require('express');
const router = express.Router();

const { ADMIN_USERNAME, ADMIN_PASSWORD } = require('../utils/config');

// Middleware
const { isAdmin } = require('../middleware');

// Model
const Job = require('../models/Job');

router.get('/', (req, res) => {
  res.render('admin/index')
});

router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.redirect('/');
  }
  req.session.isAdmin = true;
  res.redirect('/');
});

router.get('/add', isAdmin, (req, res) => {
  res.render('admin/add');
});

router.post('/add', isAdmin, async (req, res, next) => {
  try {
    const job = new Job(req.body);
    await job.save();
    req.flash('success', 'Add job successfully');
    res.redirect('/admin/add');
  } catch (error) {
    next(error);
  }
});

// admin logout
router.get('/logout', (req, res) => {
  req.session.isAdmin = false;
  res.redirect('/');
})

module.exports = router;