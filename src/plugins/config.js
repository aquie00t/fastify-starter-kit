import fastifyPlugin from "fastify-plugin";
import fastifyEnv from "@fastify/env";

/**
 * Configures environment variables for the Fastify instance.
 * @param {import("fastify").FastifyInstance} fastify - The Fastify instance.
 */
async function config(fastify) {
  // Define the schema for required environment variables.
  const schema = {
    type: "object",
    required: ["PORT", "HOST", "MONGO_CONNECTION_URI", "MONGO_DB_NAME"], // Required environment variables.
    properties: {
      PORT: {
        type: "number", // Port number for the server.
      },
      HOST: {
        type: "string", // Host address for the server.
      },
      MONGO_CONNECTION_URI: {
        type: "string", // MongoDB connection URI.
      },
      MONGO_DB_NAME: {
        type: "string", // MongoDB database name.
      },
    },
  };

  // Options for the fastify-env plugin.
  const options = {
    confKey: "config", // Key to access the configuration in Fastify.
    schema, // Schema for validation.
    dotenv: true, // Enable loading environment variables from a .env file.
  };

  // Register the fastify-env plugin with the defined options.
  fastify.register(fastifyEnv, options);
}

// Export the plugin wrapped with fastify-plugin for reusability.
export default fastifyPlugin(config);
