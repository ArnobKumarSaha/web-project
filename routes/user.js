var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController");
const isAuth = require('../middleware/is-auth');

// Show the User Profile.
router.get('/',isAuth, userController.profile);

module.exports = router;
