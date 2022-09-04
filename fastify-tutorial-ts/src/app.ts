import path from "path";
import AutoLoad from "@fastify/autoload";
import * as url from "url";
import type { FastifyInstance, RegisterOptions } from "fastify";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default async function (
  fastify: FastifyInstance,
  opts: RegisterOptions
) {
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
}
