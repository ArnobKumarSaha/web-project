const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    courseCode: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    year: {
      type: Date,
      required: true
    },
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    }
  });
  
  module.exports = mongoose.model('Course', courseSchema);