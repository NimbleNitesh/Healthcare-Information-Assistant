import express from 'express';
import bodyParser from 'body-parser';
import usersController from './controllers/signup.js';
import usersVerify from './controllers/verify.js';
import db from './db.js';

const app = express();
const port = 3000; // You can use any port you prefer
app.use(express.json( {limit: '50mb'} ));

// Define a simple route
app.post('/signup',usersController.createuser);
app.get('/verify',usersVerify.verifyuser);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
