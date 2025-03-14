const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

router.get("/", async (req, res) => {
  try {
    // const rooms = await Room.find({ available: true });
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (e) {
    res.status(500).json({ message: "Не удалось получить список комнат." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Номер не найден" });
    }
    res.status(200).json(room);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    console.log("dddd", updatedData);
    const updatedRoom = await Room.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!updatedRoom) {
      return res.status(404).json({ message: "Номер не найден" });
    }
    res.status(200).json(updatedRoom);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const roomData = req.body;
    const newRoom = new Room(roomData);
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (e) {
    res.status(500).json({ message: "Ошибка при создании комнаты" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Room.findByIdAndDelete(id);
    res.status(200).json({ message: "номер удалён" });
  } catch (e) {
    res.status(500).json({ message: "ошибка удаления номера" });
  }
});

module.exports = router;
