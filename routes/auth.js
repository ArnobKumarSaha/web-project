const express = require("express");
const authController = require("../controllers/authController");
const { check, body } = require("express-validator");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const router = express.Router();


// Login routes here.

router.get("/login", authController.getLogin);

router.post("/login",
[
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .custom((value, { req }) => {
      const typeOfUser = req.body.typeOfUser;
      if(typeOfUser == 'student'){
        return Student.findOne({ email: value }).then(stuDoc => {
          if (!stuDoc) {
            return Promise.reject(
              'No Student with this email. Do you want to signUp ?'
            );
          }
        });
      }
      else{
        return Teacher.findOne({ email: value }).then(teaDoc => {
          if (!teaDoc) {
            return Promise.reject(
              'No teacher with this email. Do you want to signUp ?'
            );
          }
        });
      }
    })
    .normalizeEmail(),
  body('password', 'Password has to be valid.')
    .isLength({ min: 4 })
],
authController.postLogin);



// SignUp routes here.       /signup for students,     /signup-teacher for teacher.
// ********************************************************************************************************************

router.get("/signup-student", authController.getSignupStudent);

router.post("/signup-student",
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
], authController.postSignupStudent);

// -------------------------------------------------Teachers SignUp------------------------------------------------------------

router.get("/signup-teacher", authController.getSignupTeacher);

router.post("/signup-teacher",
[
    [
        check('email')
          .isEmail()
          .withMessage('Please enter a valid email.')
          .custom((value, { req }) => {
            return Teacher.findOne({ email: value }).then(teaDoc => {
              if (teaDoc) {
                return Promise.reject(
                  'E-Mail exists already, please pick a different one.'
                );
              }
            });
          })
          .normalizeEmail(),
        body('name').isString(),
        body('designation')
          .isLength({min: 3})
          .withMessage('Designation should have minimum of length 3.'),
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
], authController.postSignupTeacher);

router.post("/logout", authController.postLogout);

module.exports = router;
