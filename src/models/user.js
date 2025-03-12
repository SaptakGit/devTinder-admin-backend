const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type : String,
            required: true,
            index: true,  // creating index
            minLength: 2, // set minimum length 4 in Name field.
            maxLength: 50 // set maximum length 50 in Name field.
        },
        lastName: {
            type: String
        },
        emailId: {
            type: String,
            lowercase: true, // stores the email always in lowercase
            required: true, // makes the field required
            unique: true, // makes the field unique, prevents duplicacy
            trim: true, // clear extra spaces in email
            validate(value){ // validation by external validator
                if(!validator.isEmail(value)){
                    throw new Error("Invalid Email Address "+value)
                }
            }
        },
        password: {
            type: String,
            required: true,
            validate(value){ // validation by external validator
                if(!validator.isStrongPassword(value)){
                    throw new Error("Enter a Strong Password "+value)
                }
            }
        },
        age: {
            type: Number,
            min: 18, // set min value as 18
        },
        gender: {
            type: String,
            validate(value){  //custom validation
                if(!['male','female','others'].includes(value)){
                    throw new Error("Gender data is not Valid");
                }
            },
        },
        photoUrl:{
            type: String,
            default: "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg", // set default value
            validate(value){ // validation by external validator
                if(!validator.isURL(value)){
                    throw new Error("Invalid Photo Url "+value)
                }
            }
        },
        about: {
            type: String,
            default: "This is a default about of user",
        },
        skills: {
            type: [String],
        }
    },{ 
        timestamps: true, // createdAT and UpdatedAt
    }
);

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign(
                    { _id: user._id },
                    "DEV@Tinder$0225",
                    { expiresIn: "1d" }
                );
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser, 
        passwordHash
    );
    return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);