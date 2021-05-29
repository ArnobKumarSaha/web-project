const Course = require("../../models/course");

// Just rendering admin/edit-Course view with editing=false.
exports.getAddCourse = (req, res, next) => {
  res.render("admin/course/edit-course", {
    pageTitle: "Add Course",
    path: "/admin/add-course",
    editing: false,
  });
};

// Extract data from req.body & saved them to database.
exports.postAddCourse = (req, res, next) => {
  const name = req.body.name;
  const courseCode = req.body.courseCode;
  const description = req.body.description;
  const year = req.body.year;
  const teacherId = req.body.teacherId;
  const course = new Course({
    name: name,
    year: year,
    courseCode: courseCode,
    teacherId: teacherId,
    description: description,
    students: {
      registeredStudents: []
    }
  });
  course
    .save()
    .then((result) => {
      console.log("Course Created");
      res.redirect("/admin/courses");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Just rendering all the teachers , fetched from DB.
exports.getCourses = (req, res, next) => {
  Course.find()
    .then((courses) => {
      res.render("admin/course/courses", {
        courses: courses,
        pageTitle: "Admin courses",
        path: "/admin/courses",
      });
    })
    .catch((err) => console.log(err));
};


// edit=true has been set on admin/courses edit link. Then it renders /admin/edit-course view.
exports.getEditCourse = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const courseId = req.params.courseId;

  Course.findById(courseId)
    .then((course) => {
      if (!course) {
        return res.redirect("/");
      }
      res.render("admin/course/edit-course", {
        pageTitle: "Edit course",
        path: "/admin/edit-course",
        editing: editMode,
        course: course,
      });
    })
    .catch((err) => console.log(err));
};

// Almost same as postAddcourse. Only differecne is, here courseId also been passed when creating a course.
exports.postEditCourse = (req, res, next) => {
  const courseId = req.body.courseId;
  const updatedCourseCode = req.body.courseCode;
  const updatedYear = req.body.year;
  const updatedTeacheId = req.body.teacheId;
  const updatedDescription = req.body.description;

  Course.findById(courseId)
    .then((course) => {
      course.courseCode = updatedCourseCode;
      course.teacheId = updatedTeacheId;
      course.description = updatedDescription;
      course.year = updatedYear;

      return course.save();
    })
    .then((result) => {
      console.log("course UPDATED!");
      res.redirect("/admin/courses");
    })
    .catch((err) => console.log(err));
};

// It just finds the course and deletes it.
exports.postDeleteCourse = (req, res, next) => {
  const courseId = req.body.courseId;
  Course.findByIdAndRemove(courseId)
    .then(() => {
      console.log("Course Deleted.");
      res.redirect("/admin/courses");
    })
    .catch((err) => console.log(err));
};
