import express from "express";
import morgan from "morgan";
import userRouter from "./router/user";
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/", userRouter);

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});
app.listen(3000, () => {
  console.log("[START SERVER] http://localhost:3000");
});
