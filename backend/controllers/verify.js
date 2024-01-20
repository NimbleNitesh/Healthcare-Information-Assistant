


exports.verifyuser = async (req, res) => {
    const token = req.query.token;
//   const verificationStatus = await checkVerificationStatus(token);
//   console.log(verificationStatus)
  if (0) {
    // User is already verified, prevent access or redirect them
    res.status(403).send('Access denied. Email already verified.');
  } else {
    // Allow the user to proceed with verification
    // await markEmailAsVerified(token);
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
  }
};
  