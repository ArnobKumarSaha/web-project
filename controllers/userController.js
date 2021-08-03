
// Case : 1
// After successful Login, authCotroller's postLogin() '/user' e redirect kore.


// Case : 2
// Simply '/' dileo '/user' e redirect hoy. 
// Kuno user login kora thakle (isAuthenticated hoile), ei profile() e asbe.
// login kora na thakle '/login' e redirect hobe.

exports.profile = (req, res, next) => {
  if (req.session.typeOfUser === 'student'){
    res.redirect('/student/profile');
  }
  else if (req.session.typeOfUser === 'teacher'){
    res.redirect('/teacher/profile');
  }
  else{
    res.redirect('/admin');
  }
};
  