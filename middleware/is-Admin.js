
// typeOfUser == 'admin' is still not defined.

module.exports = (req, res, next) => {
    if (req.session.typeOfUser !== 'admin') {  // typeOfUser was set on authController/postLogin route.
        return res.redirect('/login'); // If the user is not a student , then promt user to log as a student first. Bcz these routes are only student specific.
    }
    next();
}