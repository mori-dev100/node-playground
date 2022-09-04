import type { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance, _opts: unknown) {
  fastify.get("/", async (request, reply) => {
    return { root: true };
  });
}
