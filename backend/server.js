import express from 'express';
import usersController from './controllers/signup.js';
import usersVerify from './controllers/verify.js';
import db from './db.js';
import * as dotenv from "dotenv"
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000; // You can use any port you prefer
app.use(cors());
app.use(express.json( {limit: '50mb'} ));

app.get('/', (req, res) => {
  res.send({ message: "Hello World!" })
})
// Define a simple route
app.use('/signup',usersController.createuser);
app.use('/verify',usersVerify.verifyuser);
// Start the server
const startServer = async () => {
  try {
      // connect to database
      db(process.env.MONGODB_URL)

      app.listen(port, () => {
          console.log("Server has started on http://localhost:" + port)
      })

  } catch (error) {
      console.log(error)
  }
}
startServer();
