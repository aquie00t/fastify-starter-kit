import fastifyPlugin from "fastify-plugin";
import fastifySensible from "@fastify/sensible";
/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 */
async function sensible(fastify) {
  await fastify.register(fastifySensible);
}

export default fastifyPlugin(sensible);
