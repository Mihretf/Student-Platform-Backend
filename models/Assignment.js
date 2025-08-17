const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema(
    {
        title:{
                type: String, 
                required: true, 
                trim: true, 
        }, 
        courseId:{
            type: mongoose.Schema.Type.ObjectId, 
            ref: "Course",
            required: true,
        }, 
        content:{
            type: String,
            trim: true, 
            required: true, 
        },
        dueDate:{
            type: Date,
            required: true,
        },

    },
    {timestamps: true}
);

const Assignment = mongoose.model("Assignment", AssignmentSchema);
module.exports = Assignment;