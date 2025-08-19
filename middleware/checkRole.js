function checkRole(requiredRole) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ error: "Forbidden: Insufficient role" });
    }
    next();
  };
}

module.exports = checkRole;  // ✅ export the function
