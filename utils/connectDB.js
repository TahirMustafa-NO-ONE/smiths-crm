import mongoose from "mongoose";

async function connectDB() {
  if (mongoose.connections[0].readyState) return;

  const uri = process.env.MONGOOSE_URI || process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "MongoDB connection string is missing. Set MONGOOSE_URI or MONGODB_URI in your .env file."
    );
  }

  mongoose.set("strictQuery", false);
  await mongoose.connect(uri);
  console.log("Connected to DB");
}

export default connectDB;
