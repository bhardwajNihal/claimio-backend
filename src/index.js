import express from "express";
const app = express();
app.use(express.json());

import cors from "cors";
app.use(cors());

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;

import UserRoutes from "./routes/userRoutes.js";
import ClaimRoutes from "./routes/claimRoutes.js";
import LeaderboardRoutes from "./routes/leaderboardRoutes.js";
import { ConnectToDatabase } from "./configs/dbConnection.js";


app.use("/api/users", UserRoutes);
app.use("/api/claim", ClaimRoutes);
app.use("/api/leaderboard", LeaderboardRoutes);


ConnectToDatabase()
.then(() => {
    app.listen(port, () => {
        console.log("Server listening on port : ", port);
    })
})