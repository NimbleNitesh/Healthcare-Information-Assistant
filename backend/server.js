const express = require('express');
const app = express();
const db = require('./db');
const port = 3000; // You can use any port you prefer
app.use(express.json());
const usersController = require('./controllers/signup');
// Define a simple route
app.post('/signup',usersController.createuser);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
