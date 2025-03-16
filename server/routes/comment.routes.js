const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
const Comment = require("../models/Comment");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find().populate("author", "name");
    res.status(200).send(comments || []);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { text } = req.body;
    const newC = await Comment.create({
      text,
      author: req.user.id,
    });
    res.status(201).send(newC);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

router.put("/:commentId", auth, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "комментарий не найде" });
    }

    if (comment.author.toString() === req.user.id) {
      const updatСomment = await Comment.findByIdAndUpdate(
        commentId,
        { text },
        { new: true }
      );
      res.status(200).send(updatСomment);
    } else {
      res.status(403).json({ message: "Нет прав для редактирования " });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

router.delete("/:commentId", auth, async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    const user = await User.findOne({ _id: req.user.id });

    console.log("user", user);

    if (!comment) {
      return res.status(404).json({ message: "комментарий не найде" });
    }

    if (user.admin || comment.author.toString() === req.user.id) {
      await Comment.findByIdAndDelete(commentId);
      res.status(200).json({ message: "Комментарий удален" });
    } else {
      res.status(403).json({ message: "Нельзя удалить чужой комментарий " });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

module.exports = router;
