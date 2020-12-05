const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
  },
  email: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 3,
    max: 1024
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('User', UserSchema);