import {registerBaseRoutes} from "./routes/base.js";
import type {Da} from "./da/da.js";
import {FastifyTypebox} from "./server.js";
import {registerMergeRoutes} from "./routes/merge.js";

export function registerRoutes(fastify: FastifyTypebox, da: Da) {
  registerBaseRoutes(fastify)
  registerMergeRoutes(fastify, da)
}