const express = require("express"); // Import Express to create routes
const router = express.Router(); // Create a new router instance
const assignmentController = require("../controllers/assignmentController"); // Import controller functions
const verifyToken = require("../middleware/authMiddleware"); // Import token verification middleware

// Route to create a new assignment (teacher only)
router.post("/", verifyToken(["teacher"]), assignmentController.createAssignment); // Only teachers can create assignments

// Route to get assignments by course (teacher and student)
router.get("/course/:courseId", verifyToken(["teacher", "student"]), assignmentController.getAssignmentsByCourse); // Accessible to both roles

module.exports = router; // Export router to be used in main app
