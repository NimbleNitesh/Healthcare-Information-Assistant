const express = require('express');
const app = express();
const db = require('./db');
const port = 3000; // You can use any port you prefer
app.use(express.json());


const usersController = require('./controllers/signup');
const usersVerify = require('./controllers/verify');
// Define a simple route
app.post('/signup',usersController.createuser);
app.get('/verify',usersVerify.verifyuser);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
