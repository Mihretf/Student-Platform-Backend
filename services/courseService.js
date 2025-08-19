const Course = require("../models/Course");

const createCourse = async ({ title, description, teacherId }) => {
    const course = new Course({ title, description, teacherId });
    return await course.save();
};

const getCourses = async () => {
    return await Course.find();
};

module.exports = {
    createCourse,
    getCourses,
};