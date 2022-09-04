import fastify from "fastify";
import app from "./app";

const server = fastify({ logger: true });

server.register(app);

const start = async () => {
  try {
    const port: number = process.env.port ? Number(process.env.port) : 3000;
    await server.listen({ port });
  } catch (e) {
    server.log.error(e);
    process.exit(1);
  }
};

start();
