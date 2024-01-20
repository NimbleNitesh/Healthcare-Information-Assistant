// controllers/usersController.js

const User = require('../models/user');

// Controller function to handle the '/users' route
exports.createuser = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      texts: req.body.texts,
      
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
