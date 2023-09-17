const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  profile_pic_url: {
    type: String,
    required: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
