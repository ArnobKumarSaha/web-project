exports.getProfilePage = (req, res, next) => {
    res.render('teacher/teacherProfile', {
      path: '/teacher/teacherProfile',
      pageTitle: 'Teacher Profile'
    });
  };