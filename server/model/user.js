const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isLoggedin: {
    type: Boolean,
    default: false
  },
  token: {
    type: String
  }
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

module.exports = User;
