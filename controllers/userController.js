exports.profile = (req, res, next) => {
    res.render('user/profile', {
      path: '/user',
      pageTitle: 'User'
    });
  };
  