const express = require("express");
const router = express.Router();
// const authMiddleware = require('../middlewares/authMiddleware'); // Путь к вашему middleware
const authMiddleware = require("../middleware/auth.middleware"); // Путь к вашему middleware
const Booking = require("../models/Booking");

// Создание бронирования
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { roomId, startDate, endDate } = req.body;
    const booking = new Booking({
      user: req.user._id,
      room: roomId,
      startDate,
      endDate,
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Отмена бронирования
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    booking.status = "cancelled";
    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
