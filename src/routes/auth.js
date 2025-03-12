const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utlis/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");

// Sign up API
authRouter.post("/signup", async (req,res) => {
    //console.log(req.body);
    try{
        // Validation of data 
        validateSignupData(req);

        //Encrypt the password
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        // Creating a new Instance of the User Model
        const user = new User({
            firstName : firstName, 
            lastName : lastName, 
            emailId : emailId, 
            password : passwordHash
        });
        const savedUser = await user.save();
        const token = await user.getJWT();
        /*res.cookie("token", token, { 
            expires: new Date(Date.now() + 8 * 3600000)
        });*/
        res.json({status:true, message: "User added successfully!!", token: token});
    } catch (err){
        //res.status(400).send("ERROR: "+ err.message);
        res.json({status:false, message: "User Not added !!", token: ''});
    }
});

// Login API
authRouter.post("/login", async (req,res) => {
    try{
        const { emailId, password } = req.body;
        
        if(!validator.isEmail(emailId)){
            throw new Error("Email is not valid");
        }

        const user = await User.findOne({emailId : emailId});
        console.log(user);
        if(!user){
            //throw new Error("Invalid Credentials");
            res.json({
                status: false,
                message: `Invalid User`,
            })
        }

        const isLoginValid = await user.validatePassword(password);

        if(isLoginValid){
            // Create JWT Token
            const token = await user.getJWT();
            // console.log(token);

            // Add the token to cookie and send the response back to the user
            //res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000)});

            res.json({token: token});
        }else{
            //throw new Error("Invalid Credentials");
            res.json({
                status: false,
                message: `Invalid Login`,
            })
        }

    } catch(err){
        //res.status(400).send("ERROR: "+ err.message);
        res.json({
            status: false,
            message: `Invalid Credentials`,
        })
    }
});

// Logout API
/*authRouter.post("/logout", async (req,res) => {
    res.cookie("token", null, { expires: new Date(Date.now()) })
    res.send("Logout Successfull!!")
})*/

module.exports = authRouter;