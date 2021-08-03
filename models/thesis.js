const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const thesisSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    courseCode: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    description: {
      type: String,
      required: true
    },
    teachers: {
        requestedSupervisors: [
            {
                teacherId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Teacher',
                    required: true
                },
                isSupervisor: {
                    type: Boolean,
                    required: true
                },
                preferenceRank: {
                  type: Number,
                  requried: true
                }
            }
        ]
    },
    students: {
        involvedStudents: [
          {
            studentId: {
                type: Schema.Types.ObjectId,
                ref: 'Student',
                required: true
            }
          }
        ]
    },
    githubLink: {
        type: String,
        required: false
    }
  });
  
  module.exports = mongoose.model('Thesis', thesisSchema);