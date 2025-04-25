import fastifyMongo from "@fastify/mongodb";
import fastifyPlugin from "fastify-plugin";

/**
 * A plugin to connect Fastify with MongoDB.
 * @param {import("fastify").FastifyInstance} fastify - The Fastify instance.
 * @description
 * Registers the MongoDB plugin with the Fastify instance using the connection URI and database name
 * from the Fastify configuration.
 */
async function dbConnector(fastify) {
  // Register the MongoDB plugin with the provided connection URI and database name.
  fastify.register(fastifyMongo, {
    url: fastify.config.MONGO_CONNECTION_URI, // MongoDB connection URI.
    dbName: fastify.config.MONGO_DB_NAME, // MongoDB database name.
  });

  // Log a message indicating successful connection to MongoDB.
  fastify.log.info("Mongo Connected");
}

// Export the plugin wrapped with fastify-plugin for reusability.
export default fastifyPlugin(dbConnector);
