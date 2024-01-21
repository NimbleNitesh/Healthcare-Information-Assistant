import User from '../models/user.js';

async function markEmailAsVerified(userid) {
  try {
    const result = await User.findOne({ _id: userid });
    
    if (result) {
      await User.updateOne({ _id: userid }, { verified: true });
      console.log("User verified");
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error(error);
  }
}

let verifyuser = async (req, res) => {
  let id= req.params.id;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).send('User not found.');
    }

    if (user.verified) {
      return res.status(403).send('Access denied. Email already verified.');
    }

    await markEmailAsVerified(id);

    const styledMessage = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Email Confirmation</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              background-color: #f2f2f2;
            }
            .message {
              font-size: 24px;
              color: #007bff;
              margin-top: 100px;
            }
          </style>
        </head>
        <body>
          <div class="message">Email Verified Successfully!</div>
        </body>
      </html>
    `;

    res.send(styledMessage);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export default { verifyuser };
