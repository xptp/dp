const express = require("express");
const router = express.Router({ mergeParams: true });
// const roomsRouter = require("./rooms.routes");
// const bookingsRouter = require("./booking.routes");

router.use("/auth", require("./auth.routes"));
router.use("/user", require("./user.routes"));
router.use("/rooms", require("./rooms.routes"));
router.use("/bookings", require("./booking.routes"));

module.exports = router;
