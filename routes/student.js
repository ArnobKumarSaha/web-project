const path = require('path');

const express = require('express');

const studentController = require('../controllers/studentController');

const router = express.Router();

router.get('/profile', studentController.getProfilePage);

router.get('/add-project', studentController.getAddProject);

router.post('/add-project', studentController.postAddProject);


// Showing project list
router.get('/projects', studentController.getProjects);

router.get('/myprojects', studentController.getMyProjects);

/*
// Edit project
router.get('/edit-project/:projectId', studentController.getEditProject);
router.post('/edit-project', studentController.postEditProject);

//Delete project
router.post('/delete-project', studentController.postDeleteProject);

*/

router.get('/apply-for-thesis', studentController.getApplyForThesis);

router.post('/apply-for-thesis', studentController.postApplyForThesis);

router.get('/courses', studentController.getCourses);

router.get('/mycourses', studentController.getMyCourses);

router.get('/register-to-course', studentController.getRegisterToCourse);

router.post('/register-to-course', studentController.postRegisterToCourse);

router.get('/:student_regno', studentController.getProfileByReg);

module.exports = router;