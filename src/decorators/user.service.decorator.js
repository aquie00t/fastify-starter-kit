// Import the UserService class
import UserService from "../services/user.service.js";
// Import fastify-plugin to create a reusable Fastify plugin
import fastifyPlugin from "fastify-plugin";

/**
 * User Service Decorator
 * Adds the UserService instance to the Fastify instance as a decorator
 * @param {import("fastify").FastifyInstance} fastify - Fastify instance
 */
function userServiceDecorator(fastify) {
  // Attach the UserService instance to the Fastify instance
  fastify.decorate("userService", new UserService(fastify));
}

// Export the decorator as a Fastify plugin
export default fastifyPlugin(userServiceDecorator);
