import type { FastifyInstance } from "fastify";

import fp from "fastify-plugin";

export default fp(async function (fastify: FastifyInstance, opts: unknown) {
  fastify.register(require("@fastify/sensible"), {
    errorHandler: false,
  });
});
