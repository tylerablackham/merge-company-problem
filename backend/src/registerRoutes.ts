import type {FastifyInstance} from "fastify";
import {registerBaseRoutes} from "./routes/base.js";
import type {Da} from "./da/init.js";

export function registerRoutes(fastify: FastifyInstance, da: Da) {
  registerBaseRoutes(fastify)
}