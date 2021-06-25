const Project = require('../models/project');
const Teacher = require('../models/teacher');
const Course = require('../models/course');
const Student = require('../models/student');
const mongoose = require('mongoose');

exports.getProfilePage = (req, res, next) => {
  res.render('student/studentProfile', {
    path: '/student/studentProfile',
    pageTitle: 'Student Profile'
  });
};

exports.getProfileByReg = (req, res, next) => {
  const studentRegNo = req.params.student_regno;
  Student.findOne({regNo: studentRegNo})
  .then((stu) => {
    console.log('stu = ', stu);
    res.render('student/student-detail', {
      path: '/student/studentProfile',
      pageTitle: 'Student Profile',
      student: stu
    });
  })
};


// Everything about Student projects.

exports.getAddProject = (req, res, next) => {
  // Find all the teachers, then all the Courses, and send them to the view when creating a project.
  Teacher.find().then(teachers => {
    const teaLst = [];
    teachers.forEach(t => {
      teaLst.push(t.name);
    });
    teaLst.sort();

    Course.find().then(courses => {
      const couLst = [];
      courses.forEach(c => {
        couLst.push( { name: c.name, courseCode: c.courseCode} );
      });
      couLst.sort();

      res.render("student/edit-project", {
        pageTitle: "Add project",
        path: "/student/add-project",
        editing: false,
        teacherList: teaLst,
        courseList: couLst
      });
    })
  })
};

exports.postAddProject = async (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const studentId = req.body.studentId;
  const githubLink = req.body.githubLink;
  const course = req.body.course;
  const teacher = req.body.teacher;


  // Need to be change may be, when adding multiple student into project.
  const studentArray = [{studentId: mongoose.Types.ObjectId(studentId) }];
  studentArray.push({studentId: req.user._id});
  console.log('\n', course, teacher, studentArray, '\n');




  // Now Find the teachedId and courseId.
  let teacherId;
  try{
    const t = await Teacher.findOne({name: teacher});
    teacherId = t._id;
  }
  catch(e){
    console.log(e);
  };

  let courseId;
  const courseCode = course.split('**')[1];
  try{
    const c = await Course.findOne({courseCode: courseCode});
    courseId = c._id;
  }
  catch(e){
    console.log(e);
  };


  console.log("Course id is ",courseId ,"Teacher id is ",teacherId);

  // Now Save these info to database.

  const project = new Project({
    name: name,
    supervisor: teacherId,
    students: {
      involvedStudents: studentArray
    },
    description: description,
    githubLink: githubLink,
    courseCode: courseId
  });

  try{
    await project.save();
    console.log("Project created.");
    console.log(project);
    res.redirect("/student/projects");
  }
  catch(err){
    console.log(err);
  }
};

exports.getProjects = (req, res, next) => {
  Project.find()
    .then((projects) => {
      res.render("student/projects", {
        projects: projects,
        pageTitle: "Student projects",
        path: "/student/projects",
        isMine: false
      });
    })
    .catch((err) => console.log(err));
};

exports.getMyProjects = (req, res, next) => {
  Project.find({'students.involvedStudents.studentId': req.user._id})
    .then((myProjects) => {
      res.render("student/projects", {
        projects: myProjects,
        pageTitle: "Student projects",
        path: "/student/projects",
        isMine: true
      });
    })
    .catch((err) => console.log(err));
};
























// Everything about Student courses.

exports.getRegisterToCourse = (req, res, next) => {
  Course.find().then(courses => {
    const couLst = [];
    courses.forEach(c => {
      couLst.push( { name: c.name, courseCode: c.courseCode} );
    });
    couLst.sort();

    res.render("student/registerToCourse", {
      pageTitle: "Register to a Course",
      path: "/student/courses",
      editing: false,
      courseList: couLst
    });
  })
}

exports.postRegisterToCourse = async (req, res, next) => {
  const courseNamePlusCode = req.body.course;

  let courseId;
  const courseCode = courseNamePlusCode.split('**')[1];
  try{
    const course = await Course.findOne({courseCode: courseCode});
    courseId = course._id;
    let updatedRegisteredStudents = [...course.students.registeredStudents];
    updatedRegisteredStudents.push({studentId: req.user._id});
    let updatedStudents = {
      registeredStudents: updatedRegisteredStudents
    }
    course.students = updatedStudents;
    await course.save();
    console.log('course = ', course, '\n Saved to database.');

    res.redirect('/student/mycourses');
  }
  catch(e){
    console.log(e);
  };

}

exports.getCourses = (req, res, next) => {
  Course.find()
    .then((courses) => {
      res.render("student/courses", {
        courses: courses,
        pageTitle: "Student courses",
        path: "/student/courses",
        isMine: false
      });
    })
    .catch((err) => console.log(err));
};

exports.getMyCourses = (req, res, next) => {
  Course.find({'students.registeredStudents.studentId': req.user._id})
    .then((myCourses) => {
      res.render("student/courses", {
        courses: myCourses,
        pageTitle: "Student courses",
        path: "/student/courses",
        isMine: true
      });
    })
    .catch((err) => console.log(err));
};




















// Everything about Student Thesis.

exports.getApplyForThesis = (req, res, next) => {
  res.render("student/thesisApply", {
    pageTitle: "Apply for thesis",
    path: "/student/apply-for-thesis"
  });
}

exports.postApplyForThesis = (req, res, next) => {
  // Do some backEnd stuff here.
  res.redirect('/student/projects');
}