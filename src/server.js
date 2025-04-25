import Fastify from "fastify";
import routes from "./custom-plugins/routes/v1/index.js";
import config from "./plugins/config.js";
import dbConnector from "./plugins/db-connector.js";
import cors from "./plugins/cors.js";
import helmet from "./plugins/helmet.js";

const fastify = Fastify({
  logger: true,
});

async function registerPlugins() {
  await fastify.register(config);
  await fastify.register(cors);
  await fastify.register(helmet);
  await fastify.register(dbConnector);
}

async function registerCustomPlugins() {
  await fastify.register(routes, { prefix: "/api/v1" });
}

export async function build() {
  await registerPlugins();
  await registerCustomPlugins();
}

/**
 * Start a server
 */
export async function init() {
  await build();

  await fastify.listen({
    port: fastify.config.PORT,
    host: fastify.config.HOST,
  });
}

export default fastify;
