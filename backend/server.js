const express = require('express');
const app = express();
const port = 3000; // You can use any port you prefer
app.use(bodyParser.json());
const usersController = require('../controllers/usersController');
// Define a simple route
app.post('/signup',usersController.createuser);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
