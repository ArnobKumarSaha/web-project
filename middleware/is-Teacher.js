
module.exports = (req, res, next) => {
    if (req.session.typeOfUser !== 'teacher') {  // typeOfUser was set on authController/postLogin route.
        return res.redirect('/login'); // If the user is not a teacher , then promt user to log as a teacher first. Bcz these routes are only teacher specific.
    }
    next();
}