import express from "express";
import userService from "../application-service/userService";

const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await userService.fetchAllUsers();

  res.json({ users: users.map((user) => user.toJson()) });
});

router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await userService.fetchOneUser(userId);

  res.json({ user: user.toJson() });
});

export default router;
