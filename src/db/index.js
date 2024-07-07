import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Mongoose connected !! DB Host ${connection.connection.host}`);
  } catch (err) {
    console.log("MongoDB Connection FAILED", err);
    process.exit(1);
  }
};

export default connectDB;
