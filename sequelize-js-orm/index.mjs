import Express from "express";
import morgan from "morgan";
const app = Express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ mess: "hello" });
});

app.get("/now", (req, res) => {
  res.json({ time: Date.now() });
});

// Start the server
app.listen(3000);
console.log(`Server listening on http://localhost:3000/`);
