const { TooManyRequests } = require('http-errors');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  userName: {
    type: String,
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
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Admin', adminSchema);