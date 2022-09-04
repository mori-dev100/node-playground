import type { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance, opts: unknown) {
  fastify.get("/", async (request, reply) => {
    return "this is an example";
  });
}
