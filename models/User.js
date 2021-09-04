const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  passwordhash: {
    type: String,
    required: true,
    select: false,
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
