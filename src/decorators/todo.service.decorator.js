import fastifyPlugin from "fastify-plugin";
import TodoService from "../services/todo.service.js";

/**
 * @param {import("fastify").FastifyInstance} fastify
 */
async function todoServiceDecorator(fastify) {
  fastify.decorate("todoService", new TodoService(fastify));
}

export default fastifyPlugin(todoServiceDecorator);
