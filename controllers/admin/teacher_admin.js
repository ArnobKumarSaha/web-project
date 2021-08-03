const Teacher = require("../../models/teacher");

// Just rendering admin/edit-teacher view with editing=false.
exports.getAddTeacher = (req, res, next) => {
  res.render("admin/teacher/edit-teacher", {
    pageTitle: "Add Teacher",
    path: "/admin/add-teacher",
    editing: false,
  });
};

// Extract data from req.body & saved them to database.
exports.postAddTeacher = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const description = req.body.description;
  const designation = req.body.designation;
  const phone = req.body.phone;
  const teacher = new Teacher({
    name: name,
    designation: designation,
    email: email,
    phone: phone,
    description: description,
  });
  teacher
    .save()
    .then((result) => {
      console.log("Teacher created.");
      res.redirect("/admin/teachers");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Just rendering all the teachers , fetched from DB.
exports.getTeachers = (req, res, next) => {
  Teacher.find()
    .then((teachers) => {
      res.render("admin/teacher/teachers", {
        teachers: teachers,
        pageTitle: "Admin teachers",
        path: "/admin/teachers",
      });
    })
    .catch((err) => console.log(err));
};

// edit=true has been set on admin/teachers edit link. Then it renders /admin/edit-teacher view.
exports.getEditTeacher = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const teacherId = req.params.teacherId;

  Teacher.findById(teacherId)
    .then((teacher) => {
      if (!teacher) {
        return res.redirect("/");
      }
      res.render("admin/teacher/edit-teacher", {
        pageTitle: "Edit Teacher",
        path: "/admin/edit-Teacher",
        editing: editMode,
        teacher: teacher,
      });
    })
    .catch((err) => console.log(err));
};

// Almost same as postAddTeacher. Only differecne is, here teacherId also been passed when creating a Teacher.
exports.postEditTeacher = (req, res, next) => {
  const teacherId = req.body.teacherId;
  const updatedName = req.body.name;
  const updatedDesignation = req.body.designation;
  const updatedEmail = req.body.email;
  const updatedPhone = req.body.phone;
  const updatedDescription = req.body.description;

  Teacher.findById(teacherId)
    .then((teacher) => {
      teacher.name = updatedName;
      teacher.email = updatedEmail;
      teacher.phone = updatedPhone;
      teacher.description = updatedDescription;
      teacher.designation = updatedDesignation;

      return teacher.save();
    })
    .then((result) => {
      console.log("Teacher UPDATED!");
      res.redirect("/admin/teachers");
    })
    .catch((err) => console.log(err));
};

// It just finds the teacher and deletes it.
exports.postDeleteTeacher = (req, res, next) => {
  const teacherId = req.body.teacherId;
  Teacher.findByIdAndRemove(teacherId)
    .then(() => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/teachers");
    })
    .catch((err) => console.log(err));
};
