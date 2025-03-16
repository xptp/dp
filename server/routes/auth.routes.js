const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const tokenService = require("../services/token.service");
const router = express.Router({ mergeParams: true });
// const cors = require("cors");

// const corsOptions = {
//   origin: "http://localhost:3000",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   allowedHeaders: "Content-Type,Authorization",
//   credentials: true,
// };

// router.use(cors(corsOptions));

router.post("/signUp", [
  check("email", "Некорректный email").isEmail(),
  check("password", "Минимальная длина пароля 8 символов").isLength({ min: 8 }),

  async (req, res) => {
    // console.log("aaaaa", req.body);
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            errors: errors.array(),
          },
        });
      }
      const { email, name, password } = req.body;

      const normalizedEmail = email.toLowerCase();

      const existingUser = await User.findOne({ email: normalizedEmail });

      if (existingUser) {
        return res.status(400).json({
          error: {
            message: "EMAIL_EXISTS",
            code: 400,
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
      });

      const tokens = tokenService.generate({
        id: newUser.id,
        admin: newUser.admin,
      }); //_idx2
      await tokenService.save(newUser.id, tokens.refreshToken);

      res.status(201).send({ ...tokens, userId: newUser.id });
    } catch (e) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  },
]);
router.post("/signInWithPassword", [
  check("email", "Email некорректный").normalizeEmail().isEmail(),
  check("password", "Пароль не может быть пустным").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            errors: errors.array(),
          },
        });
      }
      const { email, password } = req.body;
      const normalizedEmail = email.toLowerCase();

      const existingUser = await User.findOne({ email: normalizedEmail });

      if (!existingUser) {
        return res.status(400).send({
          error: {
            message: "EMAIL_NOT_FOUND",
            code: 400,
          },
        });
      }

      const isPasswodEqual = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswodEqual) {
        return res.status(400).send({
          error: {
            message: "INVALID_PASSWORD",
            code: 400,
          },
        });
      }

      const tokens = tokenService.generate({
        id: existingUser.id,
        admin: existingUser.admin,
      });
      await tokenService.save(existingUser.id, tokens.refreshToken);

      res
        .status(200)
        .send({ ...tokens, userId: existingUser.id, user: existingUser });
    } catch (e) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  },
]);
router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefresh(refreshToken);
    const dbToken = await tokenService.findToken(refreshToken);

    if (!data || !dbToken || data.id !== dbToken?.user?.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tokens = await tokenService.generate({
      id: data.id,
      admin: data.admin,
    });
    await tokenService.save(data.id, tokens.refreshToken);

    res.status(200).send({ ...tokens, userId: data.id });
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const { refresh_token: refreshToken, userId } = req.body;
    if (refreshToken) {
      const data = tokenService.validateRefresh(refreshToken);
      const dbToken = await tokenService.findToken(refreshToken);
      if (!data || !dbToken || data.id !== dbToken?.user?.toString()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      await tokenService.removeToken(refreshToken);
    } else if (userId) {
      await tokenService.removeTokenByUserId(userId);
    } else {
      return res.status(400).json({ message: "Ошибка logout" });
    }

    res.status(200).send({ message: "logout успешно" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

module.exports = router;
