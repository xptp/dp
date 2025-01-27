const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/auth.middleware");

// Маршрут для бронирования номера
router.post("/", authMiddleware, async (req, res) => {
  console.log("Booking request:", req.body);

  const { roomId, checkInDate, checkOutDate } = req.body;
  console.log("req.user:", req.user); // Логируем req.user
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

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
// Маршрут для получениявсех бронирований пользователя
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Маршрут для получения доступных номеров
router.get("/available", async (req, res) => {
  try {
    const bookedRoomIds = await Booking.distinct("room");
    const availableRooms = await Room.find({ _id: { $nin: bookedRoomIds } });
    res.status(200).json(availableRooms);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Новый маршрут для получения забронированных дат для конкретного номера
router.get("/get-booked-dates", async (req, res) => {
  const { roomId } = req.query;

  if (!roomId) {
    return res.status(400).json({ message: "roomId is required" });
  }

  try {
    const bookings = await Booking.find({ room: roomId });
    const bookedDates = bookings.flatMap((booking) => {
      const dates = [];
      let currentDate = new Date(booking.checkInDate);
      while (currentDate <= new Date(booking.checkOutDate)) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    });
    res.status(200).json({ bookedDates });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
