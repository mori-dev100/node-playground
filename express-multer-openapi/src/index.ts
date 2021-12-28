import express from "express";
import morgan from "morgan";
import * as OpenApiValidator from "express-openapi-validator";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(
  OpenApiValidator.middleware({
    apiSpec: "./openapi.yaml",
    validateRequests: true, // (default)
    validateResponses: false,
  })
);

app.get("/hello", (req, res) => {
  res.json({ message: "world" });
});

app.post("/user", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  res.json({
    date: new Date(Date.now()).toLocaleString(),
    name,
    email,
  });
});

app.post("/user/photo", (req, res) => {
  res.json({
    status: true,
    fileName: "aaa",
  });
});

app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

const server = app.listen(3000, () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  console.log(`[SERVER]${server.address().address}:${server.address().port}`);
});
