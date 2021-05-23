
exports.getIndexPage = (req, res, next) => {
    res.render("admin/indexPage", {
        pageTitle: "Admin Index Page",
        path: "/admin/indexPage",
        editing: false,
    });
}