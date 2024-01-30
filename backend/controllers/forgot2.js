import User from '../models/user.js';

let forgot2user=async(req,res)=>{
    const email=req.body.email;
    const password=req.body.newpassword;
    try{
        const user = await User.findOne({ email});
        if (!user) {
            return res.status(201).json({ message: 'User Not Found' });
          }
          else if(!user.forgot){
            return res.status(202).json({ message: 'User Not Verified' });
          }
          else{
            user.password = password;
            user.forgot=false;
            await user.save();
            res.status(200).json({ message: 'Password reset successful.' });
          }
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default {forgot2user};