// const tokenService = require("../services/token.service");

// module.exports = (req, res, next) => {
//   if (req.method === "OPTIONS") {
//     return next();
//   }

//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const data = tokenService.validateAccess(token);

//     req.user = data;
//     if (!data) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     next();
//   } catch (e) {
//     console.error("Authentication error:", e);
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };
const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unautorized" });
    }

    const data = tokenService.validateAccess(token);

    req.user = data;
    if (!data) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  } catch (e) {
    res.status(401).json({ message: "Unautorized" });
  }
};
