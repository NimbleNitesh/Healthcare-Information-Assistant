import User from '../models/user.js';

let savechatsuser = async (req, res) => {
    const { id } = req.params;
    const reqText= req.body.req;
    const resText= req.body.res;
    try {
        const user = await User.findById(id);

        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Step 2: Update the texts array
        user.texts.push({ req: reqText, res: resText });
        console.log(reqText,resText)
        // Step 3: Save the updated user document
        await user.save();
    
        return res.status(200).json({ message: 'Texts added successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  export default {savechatsuser};
  