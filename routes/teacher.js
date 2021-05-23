const path = require('path');

const express = require('express');

const teacherController = require('../controllers/teacherController');

const router = express.Router();

router.get('/profile', teacherController.getProfilePage);

module.exports = router;