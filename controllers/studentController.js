const Project = require('../models/project');
const Teacher = require('../models/teacher');
const Course = require('../models/course');
const Student = require('../models/student');
const Thesis = require('../models/thesis');
const mongoose = require('mongoose');
const {validationResult} = require('express-validator');

exports.getProfilePage = (req, res, next) => {
  const studentName = res.locals.currentUserName;

  Course.find({'students.registeredStudents.studentId': req.user._id})
  .then(myCourses => {

    Student.findOne({name: studentName})
    .then((stu) => {

      res.render('student/student-detail', {
        path: '/student/studentProfile',
        pageTitle: 'Student Profile',
        student: stu,
        courses: myCourses,
        isMine: true
      });

    })

  })
};

exports.getProfileByReg = (req, res, next) => {
  const studentRegNo = req.params.student_regno;
  Student.findOne({regNo: studentRegNo})
  .then((stu) => {
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
  const studentReg = req.body.studentReg;
  const githubLink = req.body.githubLink;
  const course = req.body.course;
  const teacher = req.body.teacher;

  let studentId;
  try{
    const s = await Student.findOne({regNo: studentReg});
    studentId = studentId._id;
  }
  catch(e){
    console.log(e);
  };


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

exports.getProjects = async (req, res, next) => {
  let projects = await Project.find();

  for(let i=0; i<projects.length; i++){
    let courseCode = projects[i].courseCode;
    let c = await Course.findOne({_id: courseCode});
    projects[i].courseName = c.name;
    projects[i].courseId = c.courseCode;
    //Object.assign(projects[i], {courseName: c.name} );

    let teacherId = projects[i].supervisor;
    let t = await Teacher.findOne( {_id: teacherId});
    projects[i].teacherName = t.name;
  }
  res.render("student/projects", {
    projects: projects,
    pageTitle: "Student projects",
    path: "/student/projects",
    isMine: false
  });
};

exports.getMyProjects = async (req, res, next) => {
  let myProjects = await Project.find({'students.involvedStudents.studentId': req.user._id});

  for(let i=0; i<myProjects.length; i++){
    let courseCode = myProjects[i].courseCode;
    let c = await Course.findOne({_id: courseCode});
    myProjects[i].courseName = c.name;
    myProjects[i].courseId = c.courseCode;
    //Object.assign(myProjects[i], {courseName: c.name} );

    let teacherId = myProjects[i].supervisor;
    let t = await Teacher.findOne( {_id: teacherId});
    myProjects[i].teacherName = t.name;
  }

  res.render("student/projects", {
    projects: myProjects,
    pageTitle: "Student projects",
    path: "/student/projects",
    isMine: true
  });
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

exports.getCourses = async (req, res, next) => {
  let courses = await Course.find();
  
  for(let i=0; i<courses.length; i++){
    let teacherId = courses[i].teacherId;
    let t = await Teacher.findOne( {_id: teacherId});
    courses[i].teacherName = t.name;
  }

  res.render("student/courses", {
    courses: courses,
    pageTitle: "Student courses",
    path: "/student/courses",
    isMine: false
  });
};

exports.getMyCourses = async (req, res, next) => {
  let myCourses = await Course.find({'students.registeredStudents.studentId': req.user._id});

  for(let i=0; i<myCourses.length; i++){
    let teacherId = myCourses[i].teacherId;
    let t = await Teacher.findOne( {_id: teacherId});
    myCourses[i].teacherName = t.name;
  }

  res.render("student/courses", {
    courses: myCourses,
    pageTitle: "Student courses",
    path: "/student/courses",
    isMine: true
  });
};


























// Everything about Student Thesis.

exports.getApplyForThesis = (req, res, next) => {
  Teacher.find().then(teachers => {
    const teaLst = [];
    teachers.forEach(t => {
      teaLst.push(t.name);
    });
    teaLst.sort();

    let message = req.flash('error');
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }

    res.render("student/thesisApply", {
      pageTitle: "Apply for thesis",
      path: "/student/apply-for-thesis",
      editing: false,
      teacherList: teaLst,
      oldInput: {
        name: '',
        studentReg: '',
        githubLink: '',
        description: ''
      },
      errorMessage: message,
      validationErrors: []
    });
  })
}

exports.postApplyForThesis = async (req, res, next) => {

  const thesisName = req.body.name;
  const teacher_1 = req.body.teacher1; // teacher1 is only the name
  const teacher_2 = req.body.teacher2;
  const teacher_3 = req.body.teacher3;
  const teacher_4 = req.body.teacher4;
  const teacher_5 = req.body.teacher5;

  const partnerReg = req.body.studentReg;
  const gitLink = req.body.githubLink;
  const description = req.body.description;

  const errors = validationResult(req);
  console.log('errors in postApplyForThesis() => ', errors);
  if (!errors.isEmpty()) {

    const teachers = await Teacher.find();
    const teaLst = [];
    teachers.forEach(t => {
      teaLst.push(t.name);
    });
    teaLst.sort();


    return res.status(422).render("student/thesisApply", {
      pageTitle: "Apply for thesis",
      path: "/student/apply-for-thesis",
      editing: false,
      teacherList: teaLst,
      oldInput: {
        name: thesisName,
        studentReg: partnerReg,
        githubLink: gitLink,
        description: description
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  // Getting the students and teachers from entered values.

  const studentId = await Student.findOne({regNo: partnerReg});
  const studentArray = [{studentId: mongoose.Types.ObjectId(studentId._id) }];
  studentArray.push({studentId: req.user._id});

  const teacherArray = [];

  const t1Id = await Teacher.findOne({name: teacher_1});
  teacherArray.push({teacherId: t1Id._id, isSupervisor: false, preferenceRank: 1});
  const t2Id = await Teacher.findOne({name: teacher_2});
  teacherArray.push({teacherId: t2Id._id, isSupervisor: false, preferenceRank: 2});
  const t3Id = await Teacher.findOne({name: teacher_3});
  teacherArray.push({teacherId: t3Id._id, isSupervisor: false, preferenceRank: 3});
  const t4Id = await Teacher.findOne({name: teacher_4});
  teacherArray.push({teacherId: t4Id._id, isSupervisor: false, preferenceRank: 4});
  const t5Id = await Teacher.findOne({name: teacher_5});
  teacherArray.push({teacherId: t5Id._id, isSupervisor: false, preferenceRank: 5});


  // Now save it to the Database
  const thesis = new Thesis({
    name: thesisName,
    students: {
      involvedStudents: studentArray
    },
    teachers: {
      requestedSupervisors: teacherArray
    },
    description: description,
    githubLink: gitLink,
    courseCode: mongoose.Types.ObjectId("608680b7e2993721a01cd7b5")
  });
  await thesis.save();

  res.redirect('/student/projects');
}