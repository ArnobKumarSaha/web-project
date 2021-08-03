const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Admin = require('../models/admin');

module.exports = (req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    if(req.session.typeOfUser === 'student')
      Student.findById(req.session.user._id)
        .then(user => {
          req.user = user;
          next();
        })
        .catch(err => console.log(err));
    else if(req.session.typeOfUser === 'teacher')
      Teacher.findById(req.session.user._id)
        .then(user => {
          req.user = user;
          next();
        })
        .catch(err => console.log(err));
    else
      Admin.findById(req.session.user._id)
        .then(user => {
          req.user = user;
          next();
        })
        .catch(err => console.log(err));
  }