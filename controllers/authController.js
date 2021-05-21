const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');
// validate (Check) on the auth route file, And get the result here .. In auth Controller file.
const Student = require('../models/student');
const Teacher = require('../models/teacher');

exports.getLogin = (req, res, next) => {
  // If any logIn error occurs, flashing can be done on postLogin
  let message = req.flash('error');
  if (message.length > 0) { // if there is an error-flash
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message,
    oldInput: {
      email: '',
      password: ''
    },
    validationErrors: []
  });
};

function loginHelper(req,res,errors){
  res.status(422).render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: errors.array()[0].msg,
    oldInput: {
      email: req.body.email,
      password: req.body.password,
      typeOfUser: req.body.typeOfUser
    },
    validationErrors: errors.array()
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password; 
  const typeOfUser = req.body.typeOfUser;

  const errors = validationResult(req);
  // if there are errors , render the same page (with user-entered info.)
  if (!errors.isEmpty()) {
    return loginHelper(req,res,errors);
  }

  // This block is for student login.
  if(typeOfUser == 'student')
  Student.findOne({ email: email })
    .then(student => {
      // student exists with this email , bcz we checked it already in auth route.
      bcrypt
        .compare(password, student.password)
        .then(doMatch => {
          if (doMatch) { // password validation
            req.session.isLoggedIn = true;
            req.session.user = student;
            req.session.typeOfUser = typeOfUser;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          // Incorrect password entered.

          return res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: 'Invalid email or password',
            oldInput: {
              email: req.body.email,
              password: req.body.password,
              typeOfUser: req.body.typeOfUser
            },
            validationErrors: errors.array()
          });
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
    // Now this block is For Teacher Login
    else
    Teacher.findOne({ email: email })
    .then(teacher => {
      // teacher exists with this email , bcz we checked it already in auth route.
      bcrypt
        .compare(password, teacher.password)
        .then(doMatch => {
          if (doMatch) { // password validation
            req.session.isLoggedIn = true;
            req.session.user = teacher;
            req.session.typeOfUser = typeOfUser;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          // Incorrect password entered.

          return res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: 'Invalid email or password',
            oldInput: {
              email: req.body.email,
              password: req.body.password,
              typeOfUser: req.body.typeOfUser
            },
            validationErrors: errors.array()
          });
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};


// **********************************************************************************************************************

exports.getSignupStudent = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup-student', {
    path: '/signup-student',
    pageTitle: 'Signup Student',
    errorMessage: message,
    oldInput: { // for better user experience... So that user don't have to enter all the fields again.
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      regNo: ''
    },
    validationErrors: []
  });
};


exports.postSignupStudent = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const name = req.body.name;
  const regNo = req.body.regNo;

  const errors = validationResult(req);
  // if there are errors , render the same page (with user-entered info.)
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup-student', {
      path: '/signup-student',
      pageTitle: 'Signup Student',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        name: name,
        regNo: regNo
      },
      validationErrors: errors.array()
    });
  }
  // If no error, encrypt the password, and save the student into database.
  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const student = new Student({
        email: email,
        password: hashedPassword,
        regNo: regNo,
        name: name
      });
      return student.save();
    })
    .then(result => {
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err);
    });
};

// ************************************************Teacher SignUp ******************************************************

exports.getSignupTeacher = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup-teacher', {
    path: '/signup-teacher',
    pageTitle: 'Signup Teacher',
    errorMessage: message,
    oldInput: { // for better user experience... So that user don't have to enter all the fields again.
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      designation: ''
    },
    validationErrors: []
  });
};


exports.postSignupTeacher = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const name = req.body.name;
  const designation = req.body.designation;

  const errors = validationResult(req);
  // if there are errors , render the same page (with user-entered info.)
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      path: '/signup-teacher',
      pageTitle: 'Signup Teacher',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        name: name,
        designation: designation
      },
      validationErrors: errors.array()
    });
  }
  // If no error, encrypt the password, and save the teacher into database.
  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const teacher = new Teacher({
        email: email,
        password: hashedPassword,
        designation: designation,
        name: name
      });
      return teacher.save();
    })
    .then(result => {
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
