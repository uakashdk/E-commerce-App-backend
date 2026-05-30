import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // =========================
    // GET AUTH HEADER
    // =========================
    const authHeader = req.headers.authorization;
console.log("SECRET:", process.env.JWT_SECRET);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided",
      });
    }

    // =========================
    // EXTRACT TOKEN
    // =========================
    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token);

    // =========================
    // VERIFY TOKEN
    // =========================
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // =========================
    // ATTACH USER TO REQUEST
    // =========================
    req.user = {
      _id: decoded.id,   // IMPORTANT FIX
    };

    next();

  } catch (error) {
    console.log("TOKEN ERROR =>", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};