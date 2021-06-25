const path = require('path');

const express = require('express');

const teacherController = require('../controllers/teacherController');

const router = express.Router();

router.get('/profile', teacherController.getProfilePage);

router.get('/:teacher_email', teacherController.getProfileByEmail);

module.exports = router;