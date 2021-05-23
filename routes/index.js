var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/user");
});

router.post('/', (req, res, next)=>{
  // Do some backEnd works here.
})

router.get('/students', indexController.showStudents);

router.get('/teachers', indexController.showTeachers);

module.exports = router;
