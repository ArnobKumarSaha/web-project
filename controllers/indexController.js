const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Course = require('../models/course');
const Project = require('../models/project');

exports.indexing = (req, res, next) => {
  Teacher.find()
  .then((teachers) => {

    Course.find()
    .then((courses) => {
      res.render('index-2',{
        pageTitle: "teachers",
        teachers: teachers,
        courses: courses,
        path: '/index'
      });
    })
    
  })
  .catch((err) => console.log(err));
}

exports.showStudents = (req, res, next) => {
  Student.find()
    .then((students) => {
      res.render("student/student-list", {
        pageTitle: "Students",
        path: "/students",
        students: students
      });
    })
    .catch((err) => console.log(err));
}

exports.showTeachers = (req, res, next) => {
  Teacher.find()
    .then((teachers) => {
      res.render('teacher/teacher-list',{
        pageTitle: "teachers",
        path: "/teachers",
        teachers: teachers
      });
    })
    .catch((err) => console.log(err));
  }


exports.showCourses = (req, res, next) => {
  Course.find()
    .then((courses) => {
      res.render('course/courses-grid-sidebar',{
        pageTitle: "courses",
        path: "/courses",
        courses: courses
      });
    })
    .catch((err) => console.log(err));
  }

exports.showCourseDetails = (req,res, next)=>{
  const courseId = req.params.courseId;
  Course.find({courseCode: courseId})
  .then(course => {
    res.render('course/course-detail',{
      pageTitle: "Course Details",
      path: "/courses",
      myCourse: course
    })
  })
  .catch(err => {console.log(err);});
}

exports.showProjectDetails = (req,res, next)=>{
  const projectId = req.params.projectId;
  Project.find({_id: projectId})
  .then(p => {
    res.render('student/project-detail',{
      pageTitle: "project Details",
      path: "/projects",
      myCourse: p
    })
  })
  .catch(err => {console.log(err);});
}


exports.getAbout = (req, res, next) => {
  res.render('others/about',{
    pageTitle: "About",
    path: "/about",
  });
}

exports.getFaq = (req, res, next) => {
  res.render('others/faq',{
    pageTitle: "Faq",
    path: "/faq",
  });
}
exports.getContacts = (req, res, next) => {
  res.render('others/contacts',{
    pageTitle: "Contacts",
    path: "/contact",
  });
}
