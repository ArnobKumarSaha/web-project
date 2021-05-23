const Student = require('../models/student');
const Teacher = require('../models/teacher');

exports.showStudents = (req, res, next) => {
  Student.find()
    .then((students) => {
      res.render("students", {
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
      res.render('teachers',{
        pageTitle: "teachers",
        path: "/teachers",
        teachers: teachers
      });
    })
    .catch((err) => console.log(err));
  }