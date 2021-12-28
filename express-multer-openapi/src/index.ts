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
    validateResponses: true, // false by default
  })
);

app.get("/hello", (req, res) => {
  res.json({ message: "world" });
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
