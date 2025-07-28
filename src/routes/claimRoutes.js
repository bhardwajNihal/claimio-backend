import { Router } from "express";
import { User } from "../models/userModel.js";
import { Claim } from "../models/claimModel.js";

const ClaimRoutes = Router();

ClaimRoutes.post("/", async(req,res) => {

   try {
     // get userId
     const { userId } = req.body;
     const foundUser = await User.findById(userId);
 
     if(!foundUser){
         res.status(400).json({
             message: "user not found!"
         })
     }
 
     // generate points randomly btw 1 to 10
     const pointsClaimed = Math.floor(Math.random() * 11);
 
     // updating users entry
     foundUser.points += pointsClaimed;
     await foundUser.save();
 
     // adding claim entry, to maintain history
     const claimHistory = await Claim.create({
         userId: foundUser._id,
         pointsClaimed
     })
 
     res.status(200).json({
         message: "Points claimed successfully!",
         points : pointsClaimed
     })
   } catch (error) {
        console.error("error claiming points!", error);
        res.status(500).json({
            message: "Error claiming points!",
            error: error.message
        })
   }
    
})

export default ClaimRoutes;