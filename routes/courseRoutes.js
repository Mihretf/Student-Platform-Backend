const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const verifyToken = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRole");

router.post("/" , verifyToken(), courseController.createCourse);

router.get("/", verifyToken(["teacher", "student"]), courseController.getCourses);

module.exports = router;