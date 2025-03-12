const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try{
        // Read the token from the req cookies
        //console.log(req.headers);
        //const { token } = req.headers.authorization;

        let { token } = '';

        if (
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
          ) {
            
            token = req.headers.authorization.split(" ")[1];
          } 

        console.log(token);
        if(!token){
            // throw new Error("Invalid Token");
            //return res.status(401).send("Please Login!");
            return res.json({status:false, message: "Please Login"});
        }

        // Validate the token
        const decodedObj = await jwt.verify(token, process.env.JWT_SERECT);

        // Find the user
        const { _id } = decodedObj;

        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not Found");
        }

        req.user = user;
        next();
    } catch (err){
        res.json({status:false, message: err.message});
        
    }
}

module.exports = {userAuth} 