
import mongoose from "mongoose";

export const connectToDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("MONGO_URI is not defined in environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log(" Database connected successfully");
  } catch (err) {
    console.error(" Error while connecting to DB:", err);
    process.exit(1);
  }
};
export default connectToDB;

