import Express from "express";
import morgan from "morgan";
import db from "./models/index.js";
const app = Express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ mess: "hello" });
});

app.get("/now", (req, res) => {
  res.json({ time: Date.now() });
});

app.get("/users", async (req, res) => {
  const userList = await db.User.findAll();
  res.json({ userList });
});

app.get("/user/:userId", async (req, res) => {
  const user = await db.User.findByPk(req.params.userId);
  res.json({ user });
});

// Start the server
app.listen(3000);
console.log(`Server listening on http://localhost:3000/`);
