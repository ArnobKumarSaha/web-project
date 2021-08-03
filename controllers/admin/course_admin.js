const Course = require("../../models/course");
const Teacher = require("../../models/teacher");

// Just rendering admin/edit-Course view with editing=false.
exports.getAddCourse = (req, res, next) => {
  Teacher.find().then(teachers => {
    const teaLst = [];
    teachers.forEach(t => {
      teaLst.push(t.name);
    });
    teaLst.sort();

    res.render("admin/course/edit-course", {
      pageTitle: "Add Course",
      path: "/admin/add-course",
      editing: false,
      teacherList: teaLst
    });
  })
};

// Extract data from req.body & saved them to database.
exports.postAddCourse = async (req, res, next) => {
  const name = req.body.name;
  const courseCode = req.body.courseCode;
  const description = req.body.description;
  const year = req.body.year;
  const teacherName = req.body.teacher;

  let teacherId;
  try{
    const t = await Teacher.findOne({name: teacherName});
    teacherId = t._id;
  }
  catch(e){
    console.log(e);
  };

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
      Teacher.find().then(teachers => {
        const teaLst = [];
        teachers.forEach(t => {
          teaLst.push(t.name);
        });
        teaLst.sort();
        res.render("admin/course/edit-course", {
          pageTitle: "Edit course",
          path: "/admin/edit-course",
          editing: editMode,
          course: course,
          teacherList: teaLst
        });
      })
    })
    .catch((err) => console.log(err));
};

// Almost same as postAddcourse. Only differecne is, here courseId also been passed when creating a course.
exports.postEditCourse = async (req, res, next) => {
  const courseId = req.body.courseId;
  const updatedCourseCode = req.body.courseCode;
  const updatedYear = req.body.year;
  const updatedDescription = req.body.description;

  const teacherName = req.body.teacher;

  let updatedTeacheId;
  try{
    const t = await Teacher.findOne({name: teacherName});
    updatedTeacheId = t._id;
  }
  catch(e){
    console.log(e);
  };
  console.log('tname = ', teacherName, ' id = ', updatedTeacheId);

  const course = await Course.findById(courseId);
  
  course.courseCode = updatedCourseCode;
  course.teacherId = updatedTeacheId;
  course.description = updatedDescription;
  course.year = updatedYear;

  const result = await course.save();
  console.log("course UPDATED!");
  res.redirect("/admin/courses");
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
