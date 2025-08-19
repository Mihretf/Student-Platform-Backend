const { generateLessonPlan } = require("../services/aiService");

const generateLessonPlanHandler = async (req, res) => {
  const { topic, gradeLevel, objectives } = req.body;

  if (!topic || !gradeLevel || !objectives || !Array.isArray(objectives)) {
    return res.status(400).json({ success: false, message: "Invalid request body" });
  }

  try {
    const lessonPlan = await generateLessonPlan(topic, gradeLevel, objectives);
    res.status(200).json({
      success: true,
      message: "Lesson plan generated successfully.",
      data: { lessonPlan }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { generateLessonPlanHandler };
