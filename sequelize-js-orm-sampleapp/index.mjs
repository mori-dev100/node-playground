import express from "express";
import morgan from "morgan";
import models from "./models/index.js";
import userRouter from "./router/user.mjs";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.use("/", userRouter);

app.listen(3000, () => {
  console.log("[SERVER START]");
});
