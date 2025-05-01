import {
  todoArraySchema,
  todoCreateBodySchema,
  todoSchema,
  todoUpdateBodySchema,
} from "../schemas/todo.schema.js";
import {
  noContentResponseSchema,
  errorResponseSchema,
  paramsWithIdSchema,
} from "../schemas/common.schema.js";
/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 */
export default async function routes(fastify) {
  /**
   * Get all todos
   */
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      response: {
        200: todoArraySchema,
      },
    },
    handler: async () => {
      const todos = await fastify.todoService.getTodos();
      return todos;
    },
  });

  /**
   * Get a todo by id
   */
  fastify.route({
    method: "GET",
    url: "/:id",
    schema: {
      params: paramsWithIdSchema,
      response: {
        200: todoSchema,
        404: errorResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const todo = await fastify.todoService.getTodoById(id);

      if (!todo) {
        reply.code(404);
        return { message: "Todo not found" };
      }

      return todo;
    },
  });

  /**
   * Create a todo
   */
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: todoCreateBodySchema,
      response: {
        201: todoSchema,
        400: errorResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const { title, description, isCompleted = false } = request.body;
      const now = new Date().toISOString();

      const newTodo = await fastify.todoService.createTodo({
        title,
        description,
        isCompleted,
        createdAt: now,
        updatedAt: now,
      });

      reply.code(201);
      return newTodo;
    },
  });

  /**
   * Update a todo
   */
  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: {
      params: paramsWithIdSchema,
      body: todoUpdateBodySchema,
      response: {
        200: todoSchema,
        404: errorResponseSchema,
      },
    },
    handler: async (request) => {
      const { id } = request.params;

      const updatedTodo = await fastify.todoService.updateTodo(
        id,
        request.body,
      );

      return updatedTodo;
    },
  });
  /**
   * Delete a todo
   */
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      params: paramsWithIdSchema,
      response: {
        204: noContentResponseSchema,
        404: errorResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const todo = await fastify.todoService.getTodoById(id);

      if (!todo) {
        reply.code(404);
        return { message: "Todo not found" };
      }

      await fastify.todoService.deleteTodo(id);
      reply.code(204);
    },
  });
}
