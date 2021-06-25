const Teacher = require('../models/teacher');

exports.getProfilePage = (req, res, next) => {
  res.render('teacher/teacherProfile', {
    path: '/teacher/teacherProfile',
    pageTitle: 'Teacher Profile'
  });
};

exports.getProfileByEmail = (req, res, next) => {
  const teacherEmail = req.params.teacher_email;
  Teacher.findOne({email: teacherEmail})
  .then(tea =>{
    res.render('teacher/teacher-detail', {
      path: '/teacher/teacherProfile',
      pageTitle: 'Teacher Profile',
      tea: tea
    });
  })

};
  