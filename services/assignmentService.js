const Assignment = require("../models/Assignment"); // Import the Assignment model to interact with MongoDB

// Function to create a new assignment
const createAssignment = async ({ title, courseId, content, dueDate }) => {
  // Validate required fields
  if (!title || !courseId || !content || !dueDate) throw new Error("All fields are required"); // Ensure none are missing

  // Create a new assignment document in MongoDB
  const newAssignment = await Assignment.create({ title, courseId, content, dueDate }); // Save the assignment
  return newAssignment; // Return the created assignment
};

// Function to get all assignments for a course with pagination
const getAssignmentsByCourse = async (courseId, page = 1, limit = 10) => {
  // Calculate how many documents to skip
  const skip = (page - 1) * limit; // For pagination

  // Find assignments by courseId
  const assignments = await Assignment.find({ courseId }) // Filter by course
    .sort({ createdAt: -1 }) // Most recent first
    .skip(skip) // Skip previous pages
    .limit(limit); // Limit to page size

  // Count total assignments for pagination info
  const totalItems = await Assignment.countDocuments({ courseId }); // Total number of assignments
  const totalPages = Math.ceil(totalItems / limit); // Total pages based on limit

  return { assignments, pagination: { currentPage: page, totalPages, totalItems } }; // Return data and pagination
};

module.exports = { createAssignment, getAssignmentsByCourse }; // Export service functions
