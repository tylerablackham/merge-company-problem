import Fastify from "fastify";
import {registerRoutes} from "./registerRoutes.js";
import {initDa} from "./da/da.js";

export function createServer() {
  const fastify = Fastify()

  const da = initDa()

  registerRoutes(fastify, da)

  return fastify
}
