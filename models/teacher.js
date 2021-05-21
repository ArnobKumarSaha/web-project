const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  designation: {
    type: String,
    required: true
  },
  phone: {
    /*type: Schema.Types.ObjectId,
    ref: 'User',
    required: true*/
    type: Number,
    required: false
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Teacher', teacherSchema);