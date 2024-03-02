// controllers/usersController.js
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

const myUuid = uuidv4();


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  post: 587,
  secure: false,
  auth: {
    user: "healthcarellm@gmail.com",
    pass: "gylycoafvmnhthbl"
  }
});

async function sendmail({_id,email},res){
  const secretKey = myUuid + _id;

      // const verificationLink = `http://localhost:8080/verify/${_id}/${secretKey}`;
      const verificationLink = `https://healthcarellm-srq1.onrender.com/verify/${_id}/${secretKey}`;

      await transporter.sendMail({
        from: "healthcarellm@gmail.com",
        to: email, // Specify the recipient email address here
        subject: "Verifiy your Email",
        text: `Click the following link to verify your email: ${verificationLink}`,
      });
}

// Controller function to handle the '/users' route
let createuser = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    
    if (user) {
      return res.status(201).json({ message: 'Already' });
    }
    const hash = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      texts: [],
      verified: 0,
      forgot: 0
    });
    await newUser.save();
    await sendmail(newUser, res);
    res.status(200).json({ message: "Sign in" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export default { createuser };