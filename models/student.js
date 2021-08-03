const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  regNo: {
      type: Number,
      required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  /*department: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },*/
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Student', studentSchema);