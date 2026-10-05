import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Read token from cookie OR Authorization header (for cross-port Safari compatibility)
  const cookieToken = req.cookies?.token;
  const bearerToken = req.headers?.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : null;

  const token = cookieToken || bearerToken;

  if (!token) {
    return res.status(401).send("No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
};

export default authMiddleware;
