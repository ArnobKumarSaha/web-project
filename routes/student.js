const path = require('path');

const express = require('express');

const studentController = require('../controllers/studentController');

const router = express.Router();

router.get('/profile', studentController.getProfilePage);

router.get('/add-project', studentController.getAddProject);

router.post('/add-project', studentController.postAddProject);


// Showing project list
router.get('/projects', studentController.getProjects);

/*
// Edit project
router.get('/edit-project/:projectId', studentController.getEditProject);
router.post('/edit-project', studentController.postEditProject);

//Delete project
router.post('/delete-project', studentController.postDeleteProject);

*/

module.exports = router;