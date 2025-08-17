const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
    {
        title:{
            type: String, 
            required: true, 
            trim: true,

        }, 
        description:{
            type:String, 
            required: true, 
            trim: true,
        }, 
        teacherId:{
            type: mongoose.Schema.Types.ObjectId, // the stored data type will be an ObjectId of a teacher taken from the user collection
            ref: "User", // specifies which collection the obj id is pointing to
            required: true, 
        }
    }, 
    {timestamps: true}
)

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;