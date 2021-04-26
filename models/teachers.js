const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class Teacher {
  constructor(username, designation, email, phone, description, id) {
    this.name = username;
    this.email = email;
    this.description = description;
    this.designation = designation;
    this.phone = phone;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }
  
  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db
        .collection('teachers')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection('teachers').insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(teacherId) {
    const db = getDb();
    return db
      .collection('teachers')
      .findOne({ _id: new ObjectId(teacherId) })
      .then(teacher => {
        console.log(teacher);
        return teacher;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('teachers')
      .find()
      .toArray()
      .then(teachers => {
        console.log(teachers);
        return teachers;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteById(teacherId) {
    const db = getDb();
    return db
      .collection('teachers')
      .deleteOne({ _id: new mongodb.ObjectId(teacherId) })
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => {
        console.log(err);
      });
  }
};
module.exports = Teacher;