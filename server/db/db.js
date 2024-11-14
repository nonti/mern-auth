import mongoose from "mongoose";

//Connect to MongoDB
const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  }catch(err){
    console.log("Error connecting to MongoDB:", err.message);
    process.exit(1); //1 status code is failure, 0 status code is success
  }
}

export default connectDB;