const express = require('express');
const router = express.Router();

// middleware
const { isUser } = require('../middleware');

// Model
const Application = require('../models/Application');
const User = require('../models/User');

// hashing function
const bcrypt = require('bcrypt');

// helper
const { flashMessage } = require('../utils/helper');

// render register
router.get('/register', (req, res) => {
  res.render('user/register');
});

// register
router.post('/register', async (req, res, next) => {
  try {
    const { username, firstName, lastName, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = new User({ username, password: hashPassword, firstName, lastName });
    await user.save();
    flashMessage('success', 'Register successfully', "/user/register", req, res);
  } catch (error) {
    // if username existed
    if (error.message.startsWith("E11000")) {
      return flashMessage('error', 'username is existed!', "/user/register", req, res);
    }
    // another error
    next(error);
  }
});
// render login
router.get('/login', (req, res) => {
  res.render('user/login');
});

// login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return flashMessage("error", "username or password incorrect!", '/user/login', req, res);
    }
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return flashMessage("error", "username or password incorrect!", '/user/login', req, res);
    }
    // if password valid
    req.session.user = user;
    flashMessage('success', "You are logged in", "/", req, res);
  } catch (error) {
    next(error);
  }
});

// logout
router.get('/logout', (req, res) => {
  delete req.session.user;
  flashMessage("success", "You are logged out", "/", req, res);
});

// not finish .....................
router.get('/:jobId', isUser, (req, res, next) => {
  try {
    const { jobId } = req.params;
    const user = req.session.user;
    console.log(user);

  } catch (error) {
    next(error);
  }
});

module.exports = router;