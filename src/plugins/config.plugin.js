// Import fastify-plugin to create a reusable Fastify plugin
import fastifyPlugin from "fastify-plugin";
// Import fastify-env to manage environment variables
import fastifyEnv from "@fastify/env";

/**
 * Configures environment variables for the Fastify instance.
 * @param {import("fastify").FastifyInstance} fastify - The Fastify instance.
 */
async function config(fastify) {
  // Define the schema for required environment variables.
  const schema = {
    type: "object",
    required: ["MONGO_CONNECTION_URI", "MONGO_DB_NAME"], // Required environment variables.
    properties: {
      PORT: {
        type: "number", // Port number for the server.
        default: 3000, // Default port if not specified.
      },
      HOST: {
        type: "string", // Host address for the server.
        default: "0.0.0.0", // Default host if not specified.
      },
      MONGO_CONNECTION_URI: {
        type: "string", // MongoDB connection URI.
      },
      MONGO_DB_NAME: {
        type: "string", // MongoDB database name.
      },
      SALT_ROUNDS: {
        type: "number", // Number of salt rounds for password hashing.
        default: 10, // Default value if not specified.
      },
    },
  };

  // Options for the fastify-env plugin.
  const options = {
    confKey: "config", // Key to access the configuration in Fastify.
    schema, // Schema for validation of environment variables.
    dotenv: true, // Enable loading environment variables from a .env file.
  };

  // Register the fastify-env plugin with the defined options.
  fastify.register(fastifyEnv, options);
}

// Export the plugin wrapped with fastify-plugin for reusability.
export default fastifyPlugin(config);
