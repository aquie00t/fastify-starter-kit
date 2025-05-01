import fastifyPlugin from "fastify-plugin";

/**
 * @param {import("fastify").FastifyInstance} fastify
 */
async function errorHandler(fastify) {
  fastify.setErrorHandler((error, request, reply) => {
    const statusCode = error.statusCode || 500;

    const response = {
      statusCode,
      error: error.name || "Internal Server Error",
      message: error.message || "An unexpected error occurred",
    };

    reply.status(statusCode).send(response);
  });
}

export default fastifyPlugin(errorHandler);
