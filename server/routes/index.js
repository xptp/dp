const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/user", require("./user.routes"));
router.use("/rooms", require("./rooms.routes"));
router.use("/book", require("./booking.routes"));
router.use("/comments", require("./comment.routes"));

module.exports = router;
