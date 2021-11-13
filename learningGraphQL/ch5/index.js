import express from "express";
import { ApolloServer } from "apollo-server-express";
import { importSchema } from "graphql-import";
import expressPlaygroundMiddleware from "graphql-playground-middleware-express";
import { resolvers } from "./resolver.js";

import { MongoClient } from "mongodb";

const typeDefs = importSchema("./schema.graphql");

const app = express();

const MONGO_DB = "mongodb://root:example@localhost:27017/";
const client = await MongoClient.connect(MONGO_DB, { useNewUrlParser: true });
const db = client.db();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const githubToken = req.headers?.authorization;
    const currentUser = await db
      .collection("users")
      .findOne({ githubToken: githubToken });

    return { db, currentUser };
  },
});
await server.start();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`start server http://localhost:4000${server.graphqlPath}`);
});

app.get("/", (_, res) => {
  res.end("hello");
});

app.get("/test", async (req, res) => {
  const user = {
    name: "hoge",
    githubLogin: "?????",
    githubToken: "xxxxxxxxx",
    avator: "xxxxxxxxx",
  };
  const result = await db
    .collection("users")
    .replaceOne({ githubLogin: "xxx" }, user, { upsert: true });

  res.json({ result });
});

app.get(
  "/playground",
  expressPlaygroundMiddleware.default({ endpoint: "/graphql" })
);
