const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const authHeader = req.headers.authorization;
    console.log("authHeader", authHeader);
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const data = tokenService.validateAccess(token);
    if (!data) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = data;
    next();
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
