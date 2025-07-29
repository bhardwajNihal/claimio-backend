import { Router } from "express";
import { User } from "../models/userModel.js";
import { Claim } from "../models/claimModel.js";
import { io } from "../index.js";

const ClaimRoutes = Router();

ClaimRoutes.get("/history", async (req, res) => {
  try {
    const pastClaims = await Claim.find()
      .sort({ claimedAt: -1 }) // sorting in descending order
      .populate({
        // populating with user's required details
        path: "userId",
        select: "username imageUrl",
      });

    res.status(200).json({
      pastClaims,
    });
  } catch (error) {
    console.error("error fetching past claims!", error);
    res.status(500).json({
      message: "Error fetching past claims!",
      error: error.message,
    });
  }
});

ClaimRoutes.post("/", async (req, res) => {
  try {
    // get userId
    const { userId } = req.body;
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return res.status(400).json({
        message: "user not found!",
      });
    }

    // generate points randomly btw 1 to 10
    const pointsClaimed = Math.floor(Math.random() * 11);

    // updating users entry
    foundUser.points += pointsClaimed;
    await foundUser.save();

    // adding claim entry, to maintain history
    const claimHistory = await Claim.create({
      userId: foundUser._id,
      pointsClaimed,
    });


    // emitting socket event, sending updated leaderboard to client
    const users = await User.find().sort({points : -1});
    const updatedLeaderboard = users.map((user,index) => {
        return {
            username: user.username,
            profile : user.imageUrl,
            totalPoints : user.points,
            rank: index+1
        }
    })
    io.emit("leaderboard-update", updatedLeaderboard);


    res.status(200).json({
      message: "Points claimed successfully!",
      points: pointsClaimed,
    });
  } catch (error) {
    console.error("error claiming points!", error);
    res.status(500).json({
      message: "Error claiming points!",
      error: error.message,
    });
  }
});

export default ClaimRoutes;
