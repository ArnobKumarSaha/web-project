var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/user");
});

router.post('/', (req, res, next)=>{
  // Do some backEnd works here.
});

router.get('/index', indexController.indexing);

router.get('/students', indexController.showStudents);

router.get('/teachers', indexController.showTeachers);

router.get('/courses', indexController.showCourses);

router.get('/course/:courseId', indexController.showCourseDetails);

router.get('/project/:projectId', indexController.showProjectDetails);

router.get('/about', indexController.getAbout);

router.get('/faq', indexController.getFaq);

router.get('/contacts', indexController.getContacts);

module.exports = router;
