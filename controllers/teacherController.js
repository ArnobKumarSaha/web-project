const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Thesis = require('../models/thesis');
const mongoose = require('mongoose');

exports.getProfilePage = (req, res, next) => {
  const teacherName = res.locals.currentUserName;
  Teacher.findOne({name: teacherName})
  .then((tea) => {
    res.render('teacher/teacher-detail', {
      path: '/teacher/teacherProfile',
      pageTitle: 'Teacher Profile',
      tea: tea
    });
  })
};

exports.getProfileByEmail = (req, res, next) => {
  const teacherEmail = req.params.teacher_email;
  Teacher.findOne({email: teacherEmail})
  .then(tea =>{
    res.render('teacher/teacher-detail', {
      path: '/teacher/teacherProfile',
      pageTitle: 'Teacher Profile',
      tea: tea
    });
  })

};

exports.getThesisNotifications = async (req, res, next) => {
  let noti = await Thesis.find({'teachers.requestedSupervisors.teacherId': req.user._id});
  console.log('noti = ', noti, noti.length);


  let studentArray = [];

  for(let i=0;i<noti.length; i++){
    noti[i].isTaken = false;
  }

  for(let oneThesis of noti){
    let stus = oneThesis.students.involvedStudents;
    //console.log('Printing in getThesisNotifications = ', stus[0] , stus[1]);

    let stu1 = await Student.findOne({_id: stus[0].studentId} );
    let stu2 = await Student.findOne({_id: stus[1].studentId} );
    studentArray.push({student1: stu1.name, student2: stu2.name});
  }

  console.log('studentArray is : ', studentArray);
  res.render('teacher/show-thesis-notifications', {
    path: '/teacher/showThesisNotifications',
    pageTitle: 'Thesis requests',
    notifications: noti,
    studentArray: studentArray
  });
}

exports.getThesisPage = (req, res, next) => {
  res.render('teacher/show-thesis', {
    path: '/teacher/showThesis',
    pageTitle: 'Thesis Details'
  });
}

exports.getAddTeam = (req, res, next) => {
  res.render('teacher/show-thesis', {
    path: '/teacher/showThesis',
    pageTitle: 'Thesis Details'
  });
}