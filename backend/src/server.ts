import Fastify from 'fastify'
import {registerRoutes} from "./registerRoutes.js";

export function createServer() {
  const fastify = Fastify()

  registerRoutes(fastify)

  return fastify
}
