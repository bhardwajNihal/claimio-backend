import UserRoutes from "./routes/userRoutes.js";
import ClaimRoutes from "./routes/claimRoutes.js";
import LeaderboardRoutes from "./routes/leaderboardRoutes.js";
import { ConnectToDatabase } from "./configs/dbConnection.js";
import { PORT } from "./configs/config.js";

// configuring environment variables
import dotenv from "dotenv";
dotenv.config();

// initializing express server
import express from "express";
const app = express();
app.use(express.json());

// enabling cors
import cors from "cors";
app.use(cors());

// initializing a raw http server using express instance
// socket io requires raw http
import { Server } from "socket.io";
import http from "http";

const server = http.createServer(app);
export const io = new Server(server, {         // initializing server-side socket
    cors: {
        origin : "*"
    }
})

const port = PORT || 3000;

app.use("/api/users", UserRoutes);
app.use("/api/claim", ClaimRoutes);
app.use("/api/leaderboard", LeaderboardRoutes);


ConnectToDatabase()
.then(() => {
    server.listen(port, () => {         // server should listen, not app
        console.log("Server listening on port : ", port);
    })
})