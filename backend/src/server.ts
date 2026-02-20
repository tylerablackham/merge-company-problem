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

export type FastifyTypebox = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>

export function createServer() {
  const fastify = Fastify().withTypeProvider<TypeBoxTypeProvider>()

  const da = initDa()

  registerRoutes(fastify, da)

  return fastify
}
