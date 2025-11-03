import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:12341234@cluster0.isnve4n.mongodb.net/?appName=Cluster0"
    );
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ Connection Failed:", error.message);
  }
};

export default connectDB;