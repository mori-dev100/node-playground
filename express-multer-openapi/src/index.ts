import express from "express";
import morgan from "morgan";
import multer from "multer";
import * as OpenApiValidator from "express-openapi-validator";

const app = express();
const upload = multer({ dest: "uploads/" });

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

app.post("/user/photo", upload.single("profile_image"), (req, res) => {
  if (!req.files) {
    res.status(401).end();
    return;
  }

  const file = req.files[0];

  res.json({
    status: true,
    fileName: file.originalname,
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
