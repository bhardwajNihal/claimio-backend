import mongoose from "mongoose";

export const ConnectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Successfully connected to Database!");
  } catch (error) {
    console.error("Error connecting to database!", error);
    process.exit(1);
  }
};
