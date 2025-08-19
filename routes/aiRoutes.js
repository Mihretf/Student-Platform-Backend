const express = require("express");
const router = express.Router();
const { generateLessonPlan } = require("../services/aiService");
const authenticate = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/checkRole");
const { v4: uuidv4 } = require("uuid");

const lessonPlansStore = {}; // in-memory store

// Step 1: Request generation
router.post(
  "/generate-lesson-plan",
  authenticate,
  authorizeRole("teacher"),
  async (req, res) => {
    const { topic, gradeLevel, objectives } = req.body;
    if (!topic || !gradeLevel || !objectives || !Array.isArray(objectives)) {
      return res.status(400).json({ success: false, message: "Invalid request body" });
    }

    // Generate a unique request ID
    const requestId = uuidv4();

    // Respond immediately
    res.status(202).json({
      success: true,
      message: "Lesson plan is being generated. Use requestId to fetch it.",
      requestId
    });

    // Generate lesson plan in the background
    try {
      const lessonPlan = await generateLessonPlan(topic, gradeLevel, objectives);
      lessonPlansStore[requestId] = lessonPlan;
      console.log(`Lesson plan ready for requestId: ${requestId}`);
    } catch (err) {
      lessonPlansStore[requestId] = { error: err.message };
      console.error(`Failed to generate lesson plan for requestId: ${requestId}`);
    }
  }
);

// Step 2: Fetch generated lesson plan
router.get(
  "/lesson-plan/:requestId",
  authenticate,
  authorizeRole("teacher"),
  (req, res) => {
    const { requestId } = req.params;
    const lessonPlan = lessonPlansStore[requestId];

    if (!lessonPlan) {
      return res.status(404).json({ success: false, message: "Lesson plan not ready yet." });
    }

    // Return and optionally delete from store
    res.status(200).json({ success: true, lessonPlan });
    delete lessonPlansStore[requestId]; // optional cleanup
  }
);

module.exports = router;
