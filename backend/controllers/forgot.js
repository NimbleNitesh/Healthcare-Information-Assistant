import User from '../models/user.js';


let forgotuser = async (req, res) => {
    const email=req.body.email;
    const newpassword=req.body.newpassword;
    const confirmpassword= req.body.confirmpassword;
    try {
        // Find the user 
        const user = await User.findOne({ email, verified: true });
    
        if (!user) {
          return res.status(404).json({ message: 'User Not Found' });
        }
    
        // Check if newPassword and confirmPassword match
        if (newpassword !== confirmpassword) {
          return res.status(400).json({ message: 'New password and confirm password do not match.' });
        }
    
        user.password = newpassword;

    
        // Save the updated user document
        await user.save();
    
        res.status(200).json({ message: 'Password reset successful.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
  };
  
  
  export default { forgotuser };