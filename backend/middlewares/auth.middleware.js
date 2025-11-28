const jwt = require("jsonwebtoken");

const auth = (roles = []) => {
  return (req, res, next) => {
    try {
      // 1. Get token from Authorization header
      // console.log(req.headers.authorization)
      const authHeader = req.headers.authorization;
      // if (!authHeader || !authHeader.startsWith("Bearer ")) {
      //   return res.status(401).json({ message: "No token provided" });
      // }

      const token = authHeader.split(" ")[1];
      // 2. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded)

      // 3. Attach user info to req
      req.user = decoded;

      // 4. Check roles if required
      if (roles.length > 0) {
        if (!decoded.role) {
          return res.status(403).json({ message: "Forbidden: No role in token" });
        }

        if (!roles.includes(decoded.role)) {
          return res.status(403).json({ message: "Forbidden: Access denied" });
        }
      }

      // 5. Continue to next middleware
      next();
    } catch (error) {
      console.error("Auth middleware error:", error.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = auth;