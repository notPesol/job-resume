const express = require('express');
const router = express.Router();

// Middleware
const { isAdmin } = require('../middleware');

// Controller
const {renderAdmin, adminLogin, renderAddJob, addJob, renderApplieds, deleteResume, deleteJob, adminLogout} = require('../controllers/admin');

// render admin login page
router.get('/', renderAdmin);

// admin login
router.post('/', adminLogin);

// render add job page
router.get('/add', isAdmin, renderAddJob);

// add a new job
router.post('/add', isAdmin, addJob);

// render applied position
router.get('/applied', isAdmin, renderApplieds);

// delete resume and atlas doc 
router.delete('/app/:appId', isAdmin, deleteResume);

// delete a job
router.delete('/:jobId', isAdmin, deleteJob);

// admin logout
router.get('/logout', adminLogout);

module.exports = router;