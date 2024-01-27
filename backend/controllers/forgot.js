import User from '../models/user.js';


let forgotuser = async (req, res) => {
    const email=req.body.email;
    const newpassword=req.body.newpassword;
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