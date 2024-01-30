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
async function sendmail(id,email){
  const secretKey = myUuid + id;

      // const verificationLink = `http://localhost:8080/verify/${_id}/${secretKey}`;
      const verificationLink = `https://healthcarellm-srq1.onrender.com/verify2/${id}/${secretKey}`;

      await transporter.sendMail({
        from: "healthcarellm@gmail.com",
        to: email, // Specify the recipient email address here
        subject: "Verifiy your Email",
        text: `Click the following link to verify your email: ${verificationLink}`,
      });
}
let forgotuser = async (req, res) => {
    const email=req.body.email;
    // const newpassword=req.body.newpassword;
    // const confirmpassword= req.body.confirmpassword;
    try {
        // Find the user 
        const user = await User.findOne({ email});
    
        if (!user) {
          return res.status(201).json({ message: 'User Not Found' });
        }
        else if(!user.verified){
          return res.status(202).json({ message: 'User Not Verified' });
        }
        else{
          



sendmail(user._id,email).then(()=>{
  res.status(200).json({ message:"Sign in" });
})
.catch((error)=>{
  console.log(error);
})
        }
        // user.password = newpassword;

    
        // // Save the updated user document
        // await user.save();
    
        // res.status(200).json({ message: 'Password reset successful.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
  };
  
  
  export default { forgotuser };