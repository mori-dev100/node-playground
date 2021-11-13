import express from "express";
import { ApolloServer } from "apollo-server-express";
import { importSchema } from "graphql-import";
import expressPlaygroundMiddleware from "graphql-playground-middleware-express";
import { resolvers } from "./resolver.js";

import { MongoClient } from "mongodb";

const typeDefs = importSchema("./schema.graphql");

const app = express();

async function startServer() {
  const MONGO_DB = "mongodb://root:example@localhost:27017/";
  const client = await MongoClient.connect(MONGO_DB, { useNewUrlParser: true });
  const db = client.db();
  const context = { db };

  const server = new ApolloServer({ typeDefs, resolvers, context });
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`start server http://localhost:4000${server.graphqlPath}`);
  });
}

startServer();
app.get("/", (_, res) => {
  res.end("hello");
});

app.get(
  "/playground",
  expressPlaygroundMiddleware.default({ endpoint: "/graphql" })
);
