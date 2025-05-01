import fastifyHelmet from "@fastify/helmet";

/**
 * Configures security headers for the Fastify instance using Helmet.
 * @param {import("fastify").FastifyInstance} fastify - The Fastify instance.
 */
export default async function helmet(fastify) {
  // Register the Helmet plugin with the provided options.
  await fastify.register(fastifyHelmet, {
    global: true, // Apply security headers globally to all routes.
    contentSecurityPolicy: false, // Disable Content Security Policy for simplicity.
  });
}
