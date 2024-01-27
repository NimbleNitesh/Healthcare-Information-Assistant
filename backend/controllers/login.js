// routes/auth.js

import express from 'express';
// import bcrypt from 'bcrypt';
import User from '../models/user.js';


let loginuser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    // console.log(email)
    // Check if the user exists
    if (!user || !user.verified || password != user.password) {
      return res.status(201).json({ message: 'Invalid credentials' });
    }

   

    // Check if the password is correct
    

    // Login successful
    res.status(200).json({ id: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default {loginuser};
