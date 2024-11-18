const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/auth.middleware");

// Маршрут для бронирования номера
router.post("/", authMiddleware, async (req, res) => {
  console.log("Booking request:", req.body);

  const { roomId, checkInDate, checkOutDate } = req.body;
  const userId = req.user.id;

  try {
    const booking = new Booking({
      user: userId,
      room: roomId,
      checkInDate,
      checkOutDate,
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Маршрут для отмены бронирования
router.delete("/cancel/:bookingId", authMiddleware, async (req, res) => {
  const { bookingId } = req.params;
  const userId = req.user.id;

  try {
    const booking = await Booking.findById(bookingId);
    if (booking.user.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    booking.status = "cancelled";
    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
