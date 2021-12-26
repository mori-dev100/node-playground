import express from "express";
import models from "../models/index.js";

/**
 * @type import("sequelize").Model
 */
const User = models.User;

const router = express.Router();

router.get("/users", async (_, res) => {
  const users = await User.findAll();
  res.json({ users });
});
router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findByPk(userId);

  res.json({ user });
});
router.get("/user-one", async (_, res) => {
  const firstUser = await User.findOne();
  res.json({ user: firstUser });
});
export default router;
