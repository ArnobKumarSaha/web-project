const path = require('path');

const express = require('express');

const teacherAdminController = require('../controllers/admin/teacher_admin');

const router = express.Router();

// Adding Teacher
router.get('/add-teacher', teacherAdminController.getAddTeacher);
router.post('/add-teacher', teacherAdminController.postAddTeacher);

// Showing Teacher list
router.get('/teachers', teacherAdminController.getTeachers);

// Edit Teacher
router.get('/edit-teacher/:teacherId', teacherAdminController.getEditTeacher);
router.post('/edit-teacher', teacherAdminController.postEditTeacher);

//Delete Teacher
router.post('/delete-teacher', teacherAdminController.postDeleteTeacher);










const courseAdminController = require('../controllers/admin/course_admin');


// Adding Course
router.get('/add-course', courseAdminController.getAddCourse);
router.post('/add-course', courseAdminController.postAddCourse);

// Showing Course list
router.get('/courses', courseAdminController.getCourses);

// Edit Course
router.get('/edit-course/:courseId', courseAdminController.getEditCourse);
router.post('/edit-course', courseAdminController.postEditCourse);

//Delete Course
router.post('/delete-course', courseAdminController.postDeleteCourse);





module.exports = router;