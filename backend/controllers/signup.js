// controllers/usersController.js

const User = require('../models/user');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

// Generate a token with user information


const globalSecretKey = "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";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  post: 587,
  secure: false,
  auth: {
    user: "healthcarellm@gmail.com",
    pass: "gylycoafvmnhthbl"
  }
});
// Controller function to handle the '/users' route
exports.createuser = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      texts: req.body.texts,
      verified: 0
    });
    const user = {
      email: req.body.email,
    };
    const savedUser = await newUser.save();
    const secretKey = `${req.body.email}:${globalSecretKey}`;
      const token = jwt.sign(user, secretKey);

      const verificationLink = `http://localhost:8085/verify?token=${token}`;

      await transporter.sendMail({
        from: "healthcarellm@gmail.com",
        to: req.body.email, // Specify the recipient email address here
        subject: "Verifiy your Email",
        text: `Click the following link to verify your email: ${verificationLink}`,
      });
    res.json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
