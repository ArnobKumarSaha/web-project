const path = require('path');

const express = require('express');

const studentController = require('../controllers/studentController');

const router = express.Router();

router.get('/profile', studentController.getProfilePage);

module.exports = router;