const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://healthcarellm:healthcare@cluster0.tyoyico.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});
