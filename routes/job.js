const express = require('express');
const router = express.Router();

const moment = require('moment');

// Model
const Job = require('../models/Job');

// index page
router.get('/', async (req, res, next) => {
  try {
    const {search} = req.query;
    if(search){
      console.log(search);
      const jobs = await Job.find({position: {$regex: search, $options: 'i'}});
      return res.render('index', {jobs, moment});
    }
    const jobs = await Job.find();
    res.render('index', {jobs, moment});
  } catch (error) {
    next(error);
  }
});

module.exports = router;