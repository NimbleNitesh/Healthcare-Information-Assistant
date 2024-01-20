const express = require('express');
const app = express();
const db = require('./db');
const port = 3000; // You can use any port you prefer
app.use(express.json());
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  post: 587,
  secure: false,
  auth: {
    user: "healthcarellm@gmail.com",
    pass: "gylycoafvmnhthbl"
  }
});

transporter.verify((error,success)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Good",success);
    }
});

const usersController = require('./controllers/signup');
// Define a simple route
app.post('/signup',usersController.createuser);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
