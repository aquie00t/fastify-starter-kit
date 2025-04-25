import fastifyCors from "@fastify/cors";

/**
 * Configures CORS (Cross-Origin Resource Sharing) for the Fastify instance.
 * @param {import("fastify").FastifyInstance} fastify - The Fastify instance.
 */
export default async function cors(fastify) {
  await fastify.register(fastifyCors, {
    origin: true, // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    maxAge: 86400, // Cache preflight response for 24 hours
  });
}
