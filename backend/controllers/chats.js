import User from '../models/user.js';

let chatsuser = async (req, res) => {
    const id = req.body.id;
  
    try {
      // Find the user by email
      const user = await User.findOne({_id:id });
  
      // Check if the user exists
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      res.status(200).json({ chats: user.texts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  export default {chatsuser};
  