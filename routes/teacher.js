const path = require('path');

const express = require('express');

const teacherController = require('../controllers/teacherController');

const router = express.Router();

router.get('/profile', teacherController.getProfilePage);

router.get('/thesis_notifications', teacherController.getThesisNotifications);

router.get('/thesis', teacherController.getThesisPage);

router.get('/:teacher_email', teacherController.getProfileByEmail);

router.get('/add-team', teacherController.getAddTeam);

module.exports = router;