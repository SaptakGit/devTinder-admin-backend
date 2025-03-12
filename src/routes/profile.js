const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utlis/validation")


// Profile View
profileRouter.get("/profile/view", userAuth, async (req,res)=>{
    try{
        const user = req.user;
        res.json(user);
    } catch (err){
        //res.send("ERROR: "+ err.message);
        res.json({status:false, message: err.message});
    }
})

// Profile Edit
/*profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
        }

        const loggedInUser = req.user; // comming from userAuth

        //console.log(loggedInUser);
        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
        //console.log(loggedInUser);

        await loggedInUser.save(); // save the data in database

        //res.send(`${loggedInUser.firstName} your profile updated successfully!!`);
        res.json({
            message: `${loggedInUser.firstName} your profile updated successfully!!`,
            data: loggedInUser
        })

    } catch (err){
        res.status(400).send("ERROR: "+ err.message);
    }
})*/


module.exports = profileRouter;