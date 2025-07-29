import mongoose from "mongoose";
import { DATABASE_URL } from "./config.js";

export const ConnectToDatabase = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Successfully connected to Database!");
  } catch (error) {
    console.error("Error connecting to database!", error);
    process.exit(1);
  }
};
