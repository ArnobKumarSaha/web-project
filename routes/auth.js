const express = require("express");
const authController = require("../controllers/authController");
const { check, body } = require("express-validator");
const Student = require("../models/student");
const router = express.Router();


// Login routes here.

router.get("/login", authController.getLogin);

router.post("/login",
[
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .custom((value, { req }) => {
      return Student.findOne({ email: value }).then(stuDoc => {
        if (!stuDoc) {
          return Promise.reject(
            'No user with this email. Do you want to signUp ?'
          );
        }
      });
    })
    .normalizeEmail(),
  body('password', 'Password has to be valid.')
    .isLength({ min: 4 })
],
authController.postLogin);



// SignUp routes here. (signup only for students.)
// ********************************************************************************************************************

router.get("/signup", authController.getSignup);

router.post("/signup",
[
    [
        check('email')
          .isEmail()
          .withMessage('Please enter a valid email.')
          .custom((value, { req }) => {
            return Student.findOne({ email: value }).then(stuDoc => {
              if (stuDoc) {
                return Promise.reject(
                  'E-Mail exists already, please pick a different one.'
                );
              }
            });
          })
          .normalizeEmail(),
        body('name').isString(),
        body('regNo')
          .isLength(10)
          .withMessage('Registration number have to be of length 10 exactly.'),
        body(
          'password',
          'Please enter a password with at least 4 characters.'
        )
          .isLength({ min: 4 }),
        body('confirmPassword')
          .custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Passwords have to match!');
            }
            return true;
          })
      ],
], authController.postSignup);

router.post("/logout", authController.postLogout);

module.exports = router;
