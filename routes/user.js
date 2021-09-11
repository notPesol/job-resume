const express = require('express');
const router = express.Router();

// middleware
const { isUser } = require('../middleware');

// Model
const Application = require('../models/Application');
const User = require('../models/User');
const Job = require('../models/Job');

// hashing function
const bcrypt = require('bcrypt');

// helper
const { flashMessage, cloudinary, isFileValid } = require('../utils/helper');

// formidable
const formidable = require('formidable');

// module for handle path and file...
const os = require('os');
const fs = require('fs');
const path = require('path');

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

// render apply page
router.get('/:jobId', isUser, async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) return flashMessage("error", "Can't find the job!", "/", req, res);
    // if have job and user
    res.render('user/apply', { job });
  } catch (error) {
    next(error);
  }
});

// apply
router.post('/:jobId', isUser, async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024,
      maxFields: 1
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        if (err.message.startsWith('maxFileSize')) {
          return flashMessage("error", "The file is too large!", `/user/${jobId}`, req, res);
        } else {
          throw err;
        }
      }

      const file = files.file;

      const isValid = isFileValid(file);
      if(!isValid){
        return flashMessage("error", "file type not allow!", `/user/${jobId}`, req, res);
      }

      // create a file name
      const fileName = encodeURIComponent(file.name.replace(/\s/g, "-"));
      const oldName = file.path;
      const newName = path.join(os.tmpdir(), fileName);

      fs.renameSync(oldName, newName);

      const fileUrl = await cloudinary.uploader.upload(newName, {
        folder: "resume",
        unique_filename: true,
        use_filename: true
      });

      // create a application doc
      const application = new Application({
        user: req.session.user._id,
        job: jobId,
        resumeFile: fileUrl.public_id
      });

      // save to atlas
      await application.save();
      return flashMessage('success', "Your resume has been sent", "/", req, res);
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;