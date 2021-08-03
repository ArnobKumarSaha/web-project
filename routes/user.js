var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController");
const isAuthenticated = require('../middleware/is-authenticated');

// Show the User Profile.
router.get('/',isAuthenticated, userController.profile);

module.exports = router;
