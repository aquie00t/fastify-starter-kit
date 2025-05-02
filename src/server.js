// Import Fastify framework
import Fastify from "fastify";

// Import custom plugins
import routes from "./custom-plugins/routes/v1/routes.js";
import config from "./plugins/config.plugin.js";
import dbConnector from "./plugins/db.plugin.js";
import cors from "./plugins/cors.plugin.js";
import helmet from "./plugins/helmet.plugin.js";
import sensible from "./plugins/sensible.plugin.js";

// Import decorators
import userServiceDecorator from "./decorators/user.service.decorator.js";
import todoServiceDecorator from "./decorators/todo.service.decorator.js";
import passwordDecorator from "./decorators/password.decorator.js";

// Import hooks
import errorHandler from "./hooks/error-handler.hook.js";

// Create a Fastify instance with logging enabled
const fastify = Fastify({
  logger: true,
});

/**
 * Register core plugins
 * These plugins provide essential functionality like configuration, database connection, and security
 */
async function registerPlugins() {
  await fastify.register(config); // Load configuration
  await fastify.register(cors); // Enable CORS
  await fastify.register(helmet); // Add security headers
  await fastify.register(dbConnector); // Connect to the database
  await fastify.register(sensible); // Add sensible defaults and error handling
}

/**
 * Register custom plugins
 * These plugins handle application-specific routes
 */
async function registerCustomPlugins() {
  await fastify.register(routes, { prefix: "/api/v1" }); // Register API routes with a versioned prefix
}

/**
 * Register decorators
 * These decorators extend Fastify's functionality with custom services
 */
async function registerDecorators() {
  await fastify.register(todoServiceDecorator); // Add Todo service
  await fastify.register(userServiceDecorator); // Add User service
  await fastify.register(passwordDecorator, {
    saltRounds: fastify.config.SALT_ROUNDS, // Configure password hashing
  });
}

/**
 * Register hooks
 * Hooks allow you to handle application-wide events like errors
 */
async function registerHooks() {
  await fastify.register(errorHandler); // Register global error handler
}

/**
 * Build the Fastify application
 * This function initializes all plugins, decorators, and hooks
 * @returns {FastifyInstance} - The configured Fastify instance
 */
export async function build() {
  await registerPlugins(); // Register core plugins
  await registerHooks(); // Register hooks
  await registerDecorators(); // Register decorators
  await registerCustomPlugins(); // Register custom plugins
  return fastify; // Return the configured Fastify instance
}

/**
 * Start the server
 * This function builds the application and starts listening on the configured port and host
 */
export async function init() {
  await build(); // Build the application

  await fastify.listen({
    port: fastify.config.PORT, // Port from configuration
    host: fastify.config.HOST, // Host from configuration
  });
}

// Export the Fastify instance for testing or further configuration
export default fastify;
