import express from "express";
import morgan from "morgan";
import userRouter from "./router/user";
import teamRouter from "./router/team";
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/", userRouter);
app.use("/", teamRouter);

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});
app.listen(3000, () => {
  console.log("[START SERVER] http://localhost:3000");
});
