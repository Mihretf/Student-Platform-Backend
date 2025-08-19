const courseService = require("../services/courseService");


const createCourse = async (req, res) => {
    try {
        const { title, description } = req.body;
        const teacherId = req.user.id;
        const newCourse = await courseService.createCourse({
            title,
            description,
            teacherId: teacherId,
        });
        res.status(201).json({ success: true, message: "Course created successfully", data: newCourse });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await courseService.getCourses();
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createCourse,
    getCourses,
};