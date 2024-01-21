// controllers/usersController.js

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

      const verificationLink = `http://localhost:3000/verify/${_id}/${secretKey}`;

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
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      texts: [],
      verified: 0
    });
    const user = {
      email: req.body.email,
    };
    newUser.save()
    .then((result)=>{
      sendmail(result,res).then(()=>{

        res.status(200).json({ message:"Sign in" });
      })
      .catch((error)=>{
        console.log(error);
      })
    })
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


export default { createuser };