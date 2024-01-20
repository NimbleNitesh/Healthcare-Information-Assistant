const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  unique: {
    type: String,
    required: true,
    unique: true // Ensures email is unique
  },
  password: {
    type: String,
    required: true
  },
  texts: [{
    type: String
  }],
  verified: [{
    type: Boolean
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
