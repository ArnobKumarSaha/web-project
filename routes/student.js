const path = require('path');
const express = require('express');
const studentController = require('../controllers/studentController');
const router = express.Router();
const {check, body} = require('express-validator');
const teacher = require('../models/teacher');

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

router.post('/apply-for-thesis', [
    body('teacher1').isString(),
    body('teacher2')
    .isString()
    .withMessage('The input is not a string')
    .custom((value, { req }) => {
      console.log('teacher1 = ', req.body.teacher1, ' teacher2 = ', req.body.teacher2);
        if(req.body.teacher1 == req.body.teacher2){
          console.log('\n Inside student route post apply-for-thesis \n');
            return Promise.reject('Same teacher has been selected twice.');
        }
        else{
          console.log('Promise resolved in route-student apply-for-thesis');
          return Promise.resolve();
        }
      }),

    body('teacher3')
    .isString()
    .withMessage('The input is not a string')
    .custom((value, { req }) => {
        if(req.body.teacher1 == req.body.teacher3 || req.body.teacher2 == req.body.teacher3){
          console.log('\n Inside student route post apply-for-thesis \n');
            return Promise.reject('Same teacher has been selected twice.');
        }
        else{
          console.log('Promise resolved in route-student apply-for-thesis');
          return Promise.resolve();
        }
      }),

    body('teacher4')
    .isString()
    .withMessage('The input is not a string')
    .custom((value, { req }) => {
        if(req.body.teacher1 == req.body.teacher4 || req.body.teacher2 == req.body.teacher4 || req.body.teacher3 == req.body.teacher4){
          console.log('\n Inside student route post apply-for-thesis \n');
            return Promise.reject('Same teacher has been selected twice.');
        }
        else{
          console.log('Promise resolved in route-student apply-for-thesis');
          return Promise.resolve();
        }
      }),

    body('teacher5')
    .isString()
    .withMessage('The input is not a string')
    .custom((value, { req }) => {
        if(req.body.teacher1 == req.body.teacher5 || req.body.teacher2 == req.body.teacher5 || req.body.teacher3 == req.body.teacher5 || req.body.teacher4 == req.body.teacher5){
          console.log('\n Inside student route post apply-for-thesis \n');
            return Promise.reject('Same teacher has been selected twice.');
        }
        else{
          console.log('Promise resolved in route-student apply-for-thesis');
          return Promise.resolve();
        }
      })
], studentController.postApplyForThesis);

router.get('/courses', studentController.getCourses);

router.get('/mycourses', studentController.getMyCourses);

router.get('/register-to-course', studentController.getRegisterToCourse);

router.post('/register-to-course', studentController.postRegisterToCourse);

router.get('/:student_regno', studentController.getProfileByReg);

module.exports = router;