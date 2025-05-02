// Import common schemas for validation and error handling
import {
  errorResponseSchema,
  noContentResponseSchema,
  paramsWithIdSchema,
} from "../schemas/common.schema.js";

// Import user-specific schemas
import {
  userArraySchema,
  userCreateBodySchema,
  userSchema,
  userUpdateBodySchema,
} from "../schemas/user.schema.js";

/**
 * User routes
 * @param {import("fastify").FastifyInstance} fastify - Fastify instance
 */
export default async function routes(fastify) {
  /**
   * Get all users
   * This route fetches all users from the database
   */
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      response: {
        200: userArraySchema, // Response schema for an array of users
      },
    },
    handler: async () => {
      const users = await fastify.userService.getUsers(); // Fetch users from the service
      return users;
    },
  });

  /**
   * Get user by ID
   * This route fetches a single user by their ID
   */
  fastify.route({
    method: "GET",
    url: "/:id",
    schema: {
      params: paramsWithIdSchema, // Schema for validating the ID parameter
      response: {
        200: userSchema, // Response schema for a single user
        404: errorResponseSchema, // Schema for 404 error response
      },
    },
    handler: async (request) => {
      const user = await fastify.userService.getUserById(request.params.id); // Fetch user by ID
      return user;
    },
  });

  /**
   * Create a new user
   * This route creates a new user in the database
   */
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: userCreateBodySchema, // Schema for validating the request body
      response: {
        201: userSchema, // Schema for successful creation response
        400: errorResponseSchema, // Schema for 400 error response
        500: errorResponseSchema, // Schema for 500 error response
      },
    },
    handler: async (request, reply) => {
      const user = await fastify.userService.createUser(request.body); // Create a new user
      reply.code(201); // Set response status to 201 (Created)
      return user;
    },
  });

  /**
   * Update a user by ID
   * This route updates an existing user's details
   */
  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: {
      params: paramsWithIdSchema, // Schema for validating the ID parameter
      body: userUpdateBodySchema, // Schema for validating the request body
      response: {
        204: noContentResponseSchema, // Schema for 204 (No Content) response
        500: errorResponseSchema, // Schema for 500 error response
        404: errorResponseSchema, // Schema for 404 error response
        400: errorResponseSchema, // Schema for 400 error response
      },
    },
    handler: async (request, reply) => {
      const { password, email, name } = request.body;

      // Ensure at least one field is provided for update
      if (!password && !email && !name) {
        throw new fastify.httpErrors.badRequest(
          "At least one field is required",
        );
      }

      await fastify.userService.updateUserById(request.params.id, request.body); // Update user by ID
      return reply.code(204).send(); // Respond with 204 (No Content)
    },
  });

  /**
   * Delete a user by ID
   * This route deletes a user from the database
   */
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      params: paramsWithIdSchema, // Schema for validating the ID parameter
      response: {
        204: noContentResponseSchema, // Schema for 204 (No Content) response
        404: errorResponseSchema, // Schema for 404 error response
        500: errorResponseSchema, // Schema for 500 error response
      },
    },
    handler: async (request, reply) => {
      await fastify.userService.deleteUserById(request.params.id); // Delete user by ID
      return reply.code(204).send(); // Respond with 204 (No Content)
    },
  });
}
