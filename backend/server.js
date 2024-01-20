const express = require('express');
const app = express();
const port = 3000; // You can use any port you prefer
const router=express.Router();
// Define a simple route
router.post('/signup',controller.createuser);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
