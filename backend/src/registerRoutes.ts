import type {FastifyInstance} from "fastify";
import {registerBaseRoutes} from "./routes/base.js";

export function registerRoutes(fastify: FastifyInstance) {
  registerBaseRoutes(fastify)
}