import mongoose from "mongoose";

const mongoURI = 'mongodb+srv://healthcarellm:healthcare@cluster0.tyoyico.mongodb.net/?retryWrites=true&w=majority';

const connectDB = (url) => {
  mongoose.set('strictQuery', true);

  mongoose.connect(url)
      .then(() =>
          console.log("MongoDB Connected"))
      .catch((error) =>
          console.log(error))
}

export default connectDB;
