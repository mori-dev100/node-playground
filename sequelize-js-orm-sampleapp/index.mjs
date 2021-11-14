import express from "express";
import morgan from "morgan";
import models from "./models/index.js";

/**
 * @type import("sequelize").Model
 */
const User = models.User;

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.get("/users", async (_, res) => {
  const users = await User.findAll();
  res.json({ users });
});

app.listen(3000, () => {
  console.log("[SERVER START]");
});
