const Admin = require('../../models/admin');

exports.getIndexPage = (req, res, next) => {
    const adminName = res.locals.currentUserName;
    Admin.findOne({name: adminName})
    .then(admin => {
        console.log(adminName, ' admin = ', admin, )
        res.render("admin/indexPage", {
            pageTitle: "Admin Index Page",
            path: "/admin/indexPage",
            editing: false,
            admin: admin
        });
    })
    
}