const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user.id) {
      //мб _id
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.send(updatedUser);
    } else {
      res.status(401).json({ message: "Unautorized" });
    }
  } catch (e) {}
});

router.get("/", auth, async (req, res) => {
  try {
    _id = req.query._id;
    let list = [];
    if (_id) {
      list = await User.findOne({ _id: _id });
    } else {
      // console.log("33");
      list = await User.find();
    }

    res.status(200).send(list);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

router.put("/:userId", auth, async (req, res) => {
  console.log("1");

  try {
    const { userId } = req.params;
    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "Пользовательне найден" });
      }

      res.send(updatedUser);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    console.error("Ошибка при обновлении", e);
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

module.exports = router;
