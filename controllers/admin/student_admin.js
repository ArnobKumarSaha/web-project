const Student = require("../../models/student");

// Just rendering admin/edit-student view with editing=false.
exports.getAddStudent = (req, res, next) => {
  res.render("admin/student/edit-student", {
    pageTitle: "Add Student",
    path: "/admin/add-student",
    editing: false,
  });
};

// Extract data from req.body & saved them to database.
exports.postAddStudent = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const department = req.body.department;
  const regNo = req.body.regNo;
  const phone = req.body.phone;
  const student = new Student({
    name: name,
    regNo: regNo,
    email: email,
    phone: phone,
    department: department,
  });
  student
    .save()
    .then((result) => {
      console.log("Student created.");
      res.redirect("/admin/students");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Just rendering all the students , fetched from DB.
exports.getStudents = (req, res, next) => {
  Student.find()
    .then((students) => {
      res.render("admin/student/students", {
        students: students,
        pageTitle: "Admin students",
        path: "/admin/students",
      });
    })
    .catch((err) => console.log(err));
};

// edit=true has been set on admin/teachers edit link. Then it renders /admin/edit-student view.
exports.getEditStudent = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const studentId = req.params.studentId;

  Student.findById(studentId)
    .then((student) => {
      if (!student) {
        return res.redirect("/");
      }
      res.render("admin/student/edit-student", {
        pageTitle: "Edit Student",
        path: "/admin/edit-student",
        editing: editMode,
        student: student,
      });
    })
    .catch((err) => console.log(err));
};

// Almost same as postAddstudent. Only differecne is, here studentId also been passed when creating a student.
exports.postEditStudent = (req, res, next) => {
  const studentId = req.body.studentId;
  const updatedName = req.body.name;
  const updatedRegNo = req.body.regNo;
  const updatedEmail = req.body.email;
  const updatedPhone = req.body.phone;
  const updatedDepartment = req.body.department;

  Student.findById(studentId)
    .then((student) => {
      student.name = updatedName;
      student.email = updatedEmail;
      student.phone = updatedPhone;
      student.department = updatedDepartment;
      student.regNo = updatedRegNo;

      return student.save();
    })
    .then((result) => {
      console.log("Student UPDATED!");
      res.redirect("/admin/students");
    })
    .catch((err) => console.log(err));
};

// It just finds the student and deletes it.
exports.postDeleteStudent = (req, res, next) => {
  const studentId = req.body.studentId;
  Student.findByIdAndRemove(studentId)
    .then(() => {
      console.log("Student deleted.");
      res.redirect("/admin/students");
    })
    .catch((err) => console.log(err));
};
