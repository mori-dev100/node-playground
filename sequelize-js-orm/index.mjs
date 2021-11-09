import Express from "express";
import morgan from "morgan";
import db from "./models/index.js";
const app = Express();

app.use(morgan("dev"));
app.use(Express.json());

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
  const user = await db.User.findByPk(req.params.userId, {
    include: [{ model: db.Post }],
  });
  res.json({ user });
});

app.post("/user", async (req, res) => {
  const userName = req.body.name;
  const userEmail = req.body.email;
  const newUser = await db.User.create({
    name: userName,
    email: userEmail,
  });

  res.json({ newUser });
});

app.put("/user/:userId", async (req, res) => {
  const userAttribute = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await db.User.findByPk(req.params.userId);

  user.name = userAttribute.name;
  user.email = userAttribute.email;

  const newUser = await user.save();

  res.json({ user: newUser });
});

app.post("/post", async (req, res) => {
  const userId = req.body.userId || 1;
  const title = req.body.title || "no title";
  const body = req.body.body || "no body";

  const user = await db.User.findByPk(userId);

  const post = await db.Post.build({
    title: title,
    body: body,
  });

  user.addPost(post);
  const newPost = await post.save();

  res.json({ newPost });
});

app.get("/post/:postId", async (req, res) => {
  const post = await db.Post.findByPk(req.params.postId);

  res.json({ post });
});

// Start the server
app.listen(3000);
console.log(`Server listening on http://localhost:3000/`);
