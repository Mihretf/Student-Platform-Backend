const assignmentService = require("../services/assignmentService"); // Import assignment service

// Controller to create a new assignment
const createAssignment = async (req, res) => {
  try {
    const { title, courseId, content, dueDate } = req.body; // Extract data from request body
    const newAssignment = await assignmentService.createAssignment({ title, courseId, content, dueDate }); // Call service

    res.status(201).json({ // Send success response
      success: true,
      message: "Assignment created successfully",
      data: newAssignment // Return the created assignment
    });
  } catch (error) {
    res.status(400).json({ // Send error response
      success: false,
      message: error.message,
      data: null
    });
  }
};

// Controller to get all assignments for a course
const getAssignmentsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params; // Extract courseId from URL
    const { page, limit } = req.query; // Optional pagination query params
    const result = await assignmentService.getAssignmentsByCourse(courseId, Number(page) || 1, Number(limit) || 10); // Call service

    res.status(200).json({ // Send success response
      success: true,
      message: "Assignments retrieved successfully",
      data: result.assignments,
      pagination: result.pagination
    });
  } catch (error) {
    res.status(400).json({ // Send error response
      success: false,
      message: error.message,
      data: null
    });
  }
};

module.exports = { createAssignment, getAssignmentsByCourse }; // Export controllers
