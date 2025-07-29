import dotenv from "dotenv";
dotenv.config();

// defining and exporting this way prevent process.env loading problems sometimes
export const DATABASE_URL = process.env.DATABASE_URL;
export const PORT = process.env.PORT;
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
export const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;

