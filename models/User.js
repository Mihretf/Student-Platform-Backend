const mongoose = require("mongoose");

// Schema  in moongoose is like a blueprint for documents in MongoDB collection. It takes two arguments, the schemaDefinition and the schemaOptions. The first argument lists all the field and their rules, while the second arguments is optional object to control schema-level behaviors like timestamp, collection...

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String, // the data structure must be text
            required: true, // can not be empty
            unique: true, // no two users can have the same username
            trim: true, // removes space from before or after the username
        }, 
        email:{
            type: String, 
            required: true, 
            unique: true, 
            trim: true, 
            lowercase: true, // converts each email to lowercase
        },
        password:{
            type: String, 
            required: true, 
            select: false, // hides password from queries by default, unless we specifically ask for it, we will not see the password when we fetch users from the DB
        },
        role:{
            type: String, 
            enum: ["student", "parent", "teacher", "admin"], // only accepts these values as a role
            default: "student", // if not specified, user becomes a student by default

        }, 
        refreshToken:{
            type: String, 
            select: false, // do not return refreshToken by default
        }, 
    },
         { timestamps: true} // mongoose automatically adds two fields createdAt and updatedAt, when we set this to true 

       )

const User = mongoose.model("User" , userSchema);
module.exports = User;