import { Router } from "express";
import { User } from "../models/userModel.js";

const UserRoutes = Router();

UserRoutes.get("/", async(req, res) => {

    try {
        
        const existingUsers = await User.find();

        res.status(200).json({
            users: existingUsers
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching user!",
            error: error.message
        })
    }
});


UserRoutes.post("/add", async(req,res) => {

    try {
        const {username} = req.body;

        if(!username){
            res.status(400).json({
                message: "username is required!"
            })
        }

        const userAdded = await User.create({
            username
        })
    
        res.status(200).json({
            message: "user added successfully!", 
            User : userAdded
        })
    } catch (error) {
        console.error("Error adding user!", error);
        res.status(500).json({
            message: "Error adding user!",
            error: error.message
        })
    }
})

export default UserRoutes;