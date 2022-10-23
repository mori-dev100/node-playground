const serverless = require("serverless-http");
const express = require("express");
const app = express();

const knex = require("knex")({
  client: "sqlite",
  connection: {
    filename: "./sample.sqlite",
  },
});

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.get("/db", async (req, res, next) => {
  const result = await knex("sample");
  res.json({
    db: result,
  });
});
app.post("/db", async (req, res, next) => {
  const id = (await knex("sample").orderBy("id", "desc").first()).id + 1;
  const name = req.body.name;

  const result = await knex("sample").insert({
    id: Number(id),
    name: String(name),
  });

  res.json({
    status: result,
    data: {
      id,
      name,
    },
  });
});

app.use("/assets", express.static("./assets"));

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
