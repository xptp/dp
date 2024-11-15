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

module.exports = router;
