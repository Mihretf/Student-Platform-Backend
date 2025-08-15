<!-- # Student-Platform-Backend
1. Initialize Node.js project
mkdir student-platform-api
cd student-platform-api
npm init -y

2. Install dependencies
npm install express mongoose bcryptjs jsonwebtoken cookie-parser dotenv cors
npm install --save-dev nodemon

3. Set up project structure (recommended)
student-platform-api/
│
├── server.js                # Entry point for the app
├── package.json
├── .env                      # Environment variables (never commit to GitHub)
├── .gitignore                # Ignore node_modules, .env, etc.
│
├── /config
│   ├── db.js                 # MongoDB connection config
│
├── /models                   # Mongoose schemas
│   ├── User.js
│   ├── Course.js
│   ├── Assignment.js
│
├── /controllers              # Business logic for routes
│   ├── authController.js
│   ├── courseController.js
│   ├── assignmentController.js
│   ├── aiController.js
│
├── /routes                   # Route definitions
│   ├── authRoutes.js
│   ├── courseRoutes.js
│   ├── assignmentRoutes.js
│   ├── aiRoutes.js
│
├── /middleware               # Custom middleware
│   ├── authMiddleware.js     # JWT verification
│   ├── roleMiddleware.js     # Role-based access control
│   ├── errorMiddleware.js    # Global error handler
│
├── /services                 # External API & reusable logic
│   ├── aiService.js          # Google Gemini API logic
│
├── /utils                    # Helper functions
│   ├── tokenUtils.js         # Create/verify tokens
│   ├── responseFormatter.js  # Standard success/error responses
│
├── /docs                     # API documentation
│   ├── swagger.json          # OpenAPI 3.0 specification
│
└── /tests                    # Optional testing folder
    ├── auth.test.js
    ├── course.test.js


📂 Folder-by-Folder Details
1. /config
Holds app-level configurations.
Files:

db.js → Connects to MongoDB using Mongoose.

2. /models
Defines MongoDB collections using Mongoose.
Files:

User.js → Fields: username, email, password, role, refreshToken, timestamps.

Course.js → Fields: title, description, teacherId, timestamps.

Assignment.js → Fields: title, courseId, content, dueDate, timestamps.

3. /controllers
Handles business logic for each API endpoint.
Files:

authController.js → register, login, refresh token, logout.

courseController.js → create course, list courses (paginated).

assignmentController.js → create assignment, list assignments by course.

aiController.js → call Gemini API to generate a lesson plan.

4. /routes
Defines endpoint URLs and links them to controllers.
Files:

authRoutes.js → /api/v1/auth/...

courseRoutes.js → /api/v1/courses/...

assignmentRoutes.js → /api/v1/assignments/...

aiRoutes.js → /api/v1/ai/...

5. /middleware
Holds reusable middleware functions.
Files:

authMiddleware.js → Verify JWT access token.

roleMiddleware.js → Check if user has required role (teacher, student, etc.).

errorMiddleware.js → Handle errors in a consistent format.

6. /services
For calling external APIs or reusable logic.
Files:

aiService.js → Sends request to Google Gemini API and returns result.

7. /utils
Small helper functions.
Files:

tokenUtils.js → Generate access & refresh tokens.

responseFormatter.js → Standard API response format.

8. /docs
For API documentation.
Files:

swagger.json → OpenAPI 3.0 docs for all routes. -->