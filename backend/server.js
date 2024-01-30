import express from 'express';
import usersController from './controllers/signup.js';
import usersVerify from './controllers/verify.js';
import users2Verify from './controllers/verify2.js';
import usersLogin from './controllers/login.js';
import usersForgot from './controllers/forgot.js';
import users2Forgot from './controllers/forgot2.js';
import usersChats from './controllers/chats.js';
import userssaveChats from './controllers/savechats.js';
import db from './db.js';
import * as dotenv from "dotenv"
import cors from 'cors';

dotenv.config();

const app = express();
const port = 8080; // You can use any port you prefer
app.use(cors());
app.use(express.json( {limit: '50mb'} ));


// Define a simple route
app.post('/signup',usersController.createuser);
app.get('/verify/:id/:secretKey',usersVerify.verifyuser);
app.get('/verify2/:id/:secretKey',users2Verify.verify2user);
app.post('/login',usersLogin.loginuser);
app.post('/forgot',usersForgot.forgotuser);
app.post('/forgot2',users2Forgot.forgot2user);
app.post('/chats',usersChats.chatsuser);
app.post('/savechats/:id',userssaveChats.savechatsuser);
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
