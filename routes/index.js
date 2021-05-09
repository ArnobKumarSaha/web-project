var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/user");
});

router.post('/', (req, res, next)=>{
  // Do some backEnd works here.
})
module.exports = router;
