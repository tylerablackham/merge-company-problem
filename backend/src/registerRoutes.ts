import type {FastifyInstance} from "fastify";
import {registerBaseRoutes} from "./routes/base.js";
import type {Da} from "./da/da.js";

export function registerRoutes(fastify: FastifyInstance, da: Da) {
  registerBaseRoutes(fastify)
}