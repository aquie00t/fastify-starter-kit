import Fastify from "fastify";
import routes from "./custom-plugins/routes/v1/routes.js";
import config from "./plugins/config.plugin.js";
import dbConnector from "./plugins/db.plugin.js";
import cors from "./plugins/cors.plugin.js";
import helmet from "./plugins/helmet.plugin.js";
import todoServiceDecorator from "./decorators/todo.service.decorator.js";
import sensible from "./plugins/sensible.plugin.js";
import errorHandler from "./hooks/error-handler.hook.js";

const fastify = Fastify({
  logger: true,
});

async function registerPlugins() {
  await fastify.register(config);
  await fastify.register(cors);
  await fastify.register(helmet);
  await fastify.register(dbConnector);
  await fastify.register(sensible);
}

async function registerCustomPlugins() {
  await fastify.register(routes, { prefix: "/api/v1" });
}

async function registerDecorators() {
  await fastify.register(todoServiceDecorator);
}

async function registerHooks() {
  await fastify.register(errorHandler);
}

export async function build() {
  await registerPlugins();
  await registerHooks();
  await registerDecorators();
  await registerCustomPlugins();
  return fastify;
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
