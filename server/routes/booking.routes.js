const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/auth.middleware");

// бронирование номера
router.post("/", authMiddleware, async (req, res) => {
  // console.log("Booking request:", req.body);

  const { roomId, checkInDate, checkOutDate } = req.body;
  console.log("req.user:", req.user);
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "user не авторизован" });
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

router.get("/user-bookings/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await Booking.find({ user: userId }).populate("room");
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Ошибка запроса броней пользователя:", error);
    res.status(500).json({ message: error.message });
  }
});

// отмена бронирования
router.delete("/cancel/:bookingId", authMiddleware, async (req, res) => {
  const { bookingId } = req.params;
  const userId = req.user.id;

  try {
    const booking = await Booking.findById(bookingId);
    if (booking.user.toString() !== userId) {
      return res.status(403).json({ message: "Доступ запрещён" });
    }
    await Booking.findByIdAndDelete(bookingId);
    res.status(200).json({ message: "Бронь удалена" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// получения всех бронирований юзера
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/available-rooms", async (req, res) => {
  const { checkInDate, checkOutDate } = req.query;

  if (!checkInDate || !checkOutDate) {
    return res.status(400).json({ message: "нет значений" });
  }

  try {
    const bookings = await Booking.find({
      $or: [
        {
          checkInDate: { $lte: checkOutDate },
          checkOutDate: { $gte: checkInDate },
        },
        {
          checkInDate: { $gte: checkInDate },
          checkOutDate: { $lte: checkOutDate },
        },
      ],
    });

    const bookedRoomIds = bookings.map((booking) => booking.room._id);
    const availableRooms = await Room.find({ _id: { $nin: bookedRoomIds } });

    res.json(availableRooms);
  } catch (err) {
    console.error("Error fetching available rooms:", err);
    res.status(500).json({ message: err.message });
  }
});

// получения забронированных дат для конкретного номера
router.get("/get-booked-dates", async (req, res) => {
  const { roomId } = req.query;

  if (!roomId) {
    return res.status(400).json({ message: "нет roomId" });
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

// Обновление брони
router.put("/:bookingId", authMiddleware, async (req, res) => {
  const { bookingId } = req.params;
  const { checkInDate, checkOutDate } = req.body;
  const userId = req.user.id;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Бронь не найдена" });
    }
    if (booking.user.toString() !== userId) {
      return res.status(403).json({ message: "Доступ запрещён" });
    }

    booking.checkInDate = checkInDate;
    booking.checkOutDate = checkOutDate;
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
