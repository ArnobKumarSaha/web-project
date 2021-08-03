
module.exports = (req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = "something"; //req.csrfToken();
    res.locals.currentUserName = " papapa";
    res.locals.typeOfUser = " kichu ekta";
    if(res.locals.isAuthenticated){
      res.locals.currentUserName = req.user.name;
      res.locals.typeOfUser = req.session.typeOfUser;
    }
    next();
  }