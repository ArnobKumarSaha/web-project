exports.profile = (req, res, next) => {
  if (req.session.typeOfUser === 'student'){
    res.redirect('/student/profile');
  }
  if (req.session.typeOfUser === 'teacher'){
    res.redirect('/teacher/profile');
  }
  if (req.session.typeOfUser === 'admin'){
    res.redirect('/admin');
  }

  // This will not be rendered actuall. Kept it just for checking purpose.
  res.render('user/profile', {
    path: '/user',
    pageTitle: 'User'
  });
};
  