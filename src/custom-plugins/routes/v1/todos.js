import TodoService from "../../../services/todo-service.js";

/**
 * Todo Entity
 * id,
 * title,
 * description,
 * isCompleted,
 * createdAt,
 * updatedAt,
 */

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 */
export default async function routes(fastify) {
  const todoService = new TodoService(fastify);

  /**
   * Get all todos
   */
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              title: { type: "string" },
              description: { type: "string" },
              isCompleted: { type: "boolean" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
        },
      },
    },
    handler: async () => {
      const todos = await todoService.getTodos();
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
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"],
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            isCompleted: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        404: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const todo = await todoService.getTodoById(id);

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
      body: {
        type: "object",
        required: ["title", "description"],
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          isCompleted: { type: "boolean", default: false },
        },
      },
      response: {
        201: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            isCompleted: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { title, description, isCompleted = false } = request.body;
      const now = new Date().toISOString();

      const newTodo = await todoService.createTodo({
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
   * Edit a todo
   */
  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"],
      },
      body: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          isCompleted: { type: "boolean" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            isCompleted: { type: "boolean" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        404: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const todo = await todoService.getTodoById(id);

      if (!todo) {
        reply.code(404);
        return { message: "Todo not found" };
      }

      const updatedTodo = await todoService.updateTodo(id, request.body);
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
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
        required: ["id"],
      },
      response: {
        204: {
          type: "null",
        },
        404: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const todo = await todoService.getTodoById(id);

      if (!todo) {
        reply.code(404);
        return { message: "Todo not found" };
      }

      await todoService.deleteTodo(id);
      reply.code(204);
    },
  });
}
