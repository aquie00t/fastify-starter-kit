/**
 * Registers the main routes for the API.
 * @param {import("fastify").FastifyInstance} fastify - The Fastify instance.
 */
export default async function routes(fastify) {
  // Register the todos routes with the prefix "/todos".
  fastify.register(import("./todos.js"), { prefix: "/todos" });

  /**
   * Root route for the API.
   * Method: GET
   * URL: /
   * Response: A welcome message.
   */
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" }, // The welcome message.
          },
        },
      },
    },

    // Handler for the root route.
    handler: () => {
      return { message: "Welcome To API" };
    },
  });
}
