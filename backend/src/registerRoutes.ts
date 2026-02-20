import type {Da} from "./da/da.js";
import {FastifyTypebox} from "./server.js";
import {registerCompanyRoutes} from "./routes/company.js";

export function registerRoutes(fastify: FastifyTypebox, da: Da) {
  registerCompanyRoutes(fastify, da)
}