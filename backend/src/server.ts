import Fastify, {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault
} from "fastify";
import {registerRoutes} from "./registerRoutes.js";
import {TypeBoxTypeProvider} from "@fastify/type-provider-typebox";
import {initDa} from "./da/da.js";
import cors from "@fastify/cors";

export type FastifyTypebox = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>

export function createServer() {
  const fastify = Fastify().withTypeProvider<TypeBoxTypeProvider>()

  fastify.register(cors, {
    origin: "http://localhost:5173", // e.g. frontend
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // set true if you send cookies/credentials
  });

  const da = initDa()

  registerRoutes(fastify, da)

  return fastify
}
