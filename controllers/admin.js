const { ADMIN_USERNAME, ADMIN_PASSWORD } = require('../utils/config');

// Model
const Job = require('../models/Job');
const Application = require('../models/Application');

// helper
const { flashMessage } = require('../utils/helper');

const moment = require('moment');

module.exports.renderAdmin = (req, res) => {
  res.render('admin/index')
}

module.exports.adminLogin = (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.redirect('/');
  }
  req.session.isAdmin = true;
  res.redirect('/');
}

module.exports.renderAddJob = (req, res) => {
  res.render('admin/add');
}

module.exports.addJob = async (req, res, next) => {
  try {
    const job = new Job(req.body);
    await job.save();
    flashMessage('success', 'Add job successfully', "/admin/add", req, res);
  } catch (error) {
    next(error);
  }
}

module.exports.renderApplieds = async (req, res, next) => {
  try {
    const applications = await Application.find()
      .populate("user", ['firstName', 'lastName'])
      .populate('job', 'position');
    res.render('admin/applied', { applications, moment });
  } catch (error) {
    next(error);
  }
}

module.exports.deleteResume = async (req, res, next) => {
  try {
    const { appId } = req.params;
    await Application.findByIdAndDelete({ _id: appId });

    flashMessage("success", "Delete resume successfully.", '/admin/applied', req, res);
  } catch (error) {
    next(error);
  }
}

module.exports.deleteJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    await Job.findByIdAndDelete(jobId);
    flashMessage("success", "Delete the job successfully.", '/', req, res);
  } catch (error) {
    next(error);
  }
}

module.exports.adminLogout = (req, res) => {
  req.session.isAdmin = false;
  res.redirect('/');
}