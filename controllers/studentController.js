const Project = require('../models/project');
const Teacher = require('../models/teacher');
const Course = require('../models/course');

exports.getProfilePage = (req, res, next) => {
  res.render('student/studentProfile', {
    path: '/student/studentProfile',
    pageTitle: 'Student Profile'
  });
};

exports.getAddProject = (req, res, next) => {
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

exports.postAddProject = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const courseCode = req.body.courseCode;
  const teacherId = req.body.teacherId;
  const studentId = req.body.studentId;
  const githubLink = req.body.githubLink;

  console.log(req.body.teacher, " - ", req.body.course);

  const studentArray = [{studentId: studentId}];

  const project = new Project({
    name: name,
    supervisor: teacherId,
    students: studentArray,
    description: description,
    githubLink: githubLink,
    courseCode: courseCode
  });
  project
    .save()
    .then((result) => {
      console.log("Project created.");
      res.redirect("/student/projects");  // add it
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProjects = (req, res, next) => {
  Project.find()
    .then((projects) => {
      res.render("student/projects", {
        projects: projects,
        pageTitle: "Student projects",
        path: "/student/projects",
      });
    })
    .catch((err) => console.log(err));
};