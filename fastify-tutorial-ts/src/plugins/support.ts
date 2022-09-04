import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";

export default fp(async function (fastify: FastifyInstance, opts: unknown) {
  fastify.decorate("someSupport", function () {
    return "hugs";
  });
});
