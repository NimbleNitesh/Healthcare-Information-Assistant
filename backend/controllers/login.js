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

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the user is verified
    if (!user.verified) {
      return res.status(403).json({ message: 'Email not verified. Please check your email for verification instructions.' });
    }

    // Check if the password is correct
    const passwordMatch = user.password;

    if (passwordMatch!=password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Login successful
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default {loginuser};
