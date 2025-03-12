const validator = require("validator");

const validateSignupData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("First Name or Last Name is not valid");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email is not Valid");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter a strong password");
    }
}

const validateEditProfileData = (req) => {
    const allowsEditFields = ["firstName", "lastName", "age", "gender", "photoUrl", "skills", "about"];

    const isEditAllowed = Object.keys(req.body).every((field) => allowsEditFields.includes(field));

    return isEditAllowed;

}

module.exports = {validateSignupData, validateEditProfileData};