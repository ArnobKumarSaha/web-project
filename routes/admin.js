const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin/teacher_admin');

const router = express.Router();

// Adding Teacher
router.get('/add-teacher', adminController.getAddTeacher);
router.post('/add-teacher', adminController.postAddTeacher);

// Showing Teacher list
router.get('/teachers', adminController.getTeachers);

// Edit Teacher
router.get('/edit-teacher/:teacherId', adminController.getEditTeacher);
router.post('/edit-teacher', adminController.postEditTeacher);

//Delete Teacher
router.post('/delete-teacher', adminController.postDeleteTeacher);

module.exports = router;