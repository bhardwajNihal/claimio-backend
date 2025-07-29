import { Router } from "express";
import { User } from "../models/userModel.js";

const LeaderboardRoutes = Router();

LeaderboardRoutes.get("/", async(req, res) => {

    try {
        // fetching existing users, sorting them in descending order
        const users = await User.find().sort({points: -1});
        
        // preparing leaderboard data
        const leaderboard = users.map((user,index) => {
            return {
                username: user.username,
                profile : user.imageUrl,
                totalPoints : user.points,
                rank: index+1
            }
        })
    
        res.status(200).json({
            leaderboard
        })
    } catch (error) {
        console.error("Error fetching leaderboard!", error);
        res.status(500).json({
            message: "Error fetching leaderboard!",
            error: error.message
        })
    }
});


export default LeaderboardRoutes;