import type {FastifyInstance} from "fastify";

export function registerBaseRoutes(fastify: FastifyInstance) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' };
  });
}