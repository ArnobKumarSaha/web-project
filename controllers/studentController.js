exports.getProfilePage = (req, res, next) => {
    res.render('student/studentProfile', {
      path: '/student/studentProfile',
      pageTitle: 'Student Profile'
    });
  };