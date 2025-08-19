const axios = require("axios");

// Load API key from environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Function to generate a lesson plan using Gemini API
async function generateLessonPlan(topic, gradeLevel, objectives) {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key not found. Set GEMINI_API_KEY in your .env file.");
  }

  const prompt = `
  Generate a detailed lesson plan for teachers.
  Topic: ${topic}
  Grade Level: ${gradeLevel}
  Objectives: ${objectives.join(", ")}
  Please provide structured steps, activities, and suggested materials.
  `;

  console.log("Sending request to Gemini API...");

  try {
    const response = await axios.post(
      "https://aistudio.google.com/apikey/v1/generate", // replace with actual endpoint
      {
        prompt: prompt,
        temperature: 0.7,
        maxOutputTokens: 800
      },
      {
        headers: {
          "Authorization": `Bearer ${GEMINI_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 30000 // 30 seconds timeout
      }
    );

    console.log("Gemini API responded successfully.");

    const lessonPlan = response.data?.data?.lessonPlan || response.data?.outputText || "";
    return lessonPlan;

  } catch (error) {
    if (error.code === "ECONNABORTED") {
      console.error("Gemini API request timed out.");
      throw new Error("The request took too long. Please try again later.");
    }
    console.error("Gemini API error:", error.response?.data || error.message);
    throw new Error("Failed to generate lesson plan from AI.");
  }
}

module.exports = { generateLessonPlan };
