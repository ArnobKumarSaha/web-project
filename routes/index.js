var express = require('express');
var router = express.Router();

const db = require('../util/database').getDb;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res, next)=>{
  // Do some backEnd works here.
})
module.exports = router;
