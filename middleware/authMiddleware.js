const jwt = require("jsonwebtoken");
const User = require("../models/User"); // optional, if you want to fetch user details from DB

// Middleware factory: accepts an array of allowed roles
const verifyToken = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      // 1. Get token from Authorization header
      const authHeader = req.headers["authorization"];
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access token missing" });
      }

      const token = authHeader.split(" ")[1]; // split "Bearer <token>"

      // 2. Verify token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      // decoded contains whatever we put in the payload (id, role, etc.)
      req.user = decoded; // attach user info to request

      // 3. Role-based access check
      if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden: insufficient permissions" });
      }

      // 4. All checks passed, proceed to next middleware/controller
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = verifyToken;
