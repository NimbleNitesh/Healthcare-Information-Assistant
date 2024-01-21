import express from 'express';
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    // unique: true // Ensures email is unique
  },
  password: {
    type: String,
    required: true
  },
  texts: [{
    // json type with two keys: req and res
    req: {
      type: String
    },
    res: {
      type: String
    }
  }],
  verified: {
    type: Boolean
  }
});

const User = mongoose.model('User', userSchema);

export default User;