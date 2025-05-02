// Import bcrypt for password hashing and comparison
import bcrypt from "bcrypt";
// Import fastify-plugin to create a reusable Fastify plugin
import fastifyPlugin from "fastify-plugin";

/**
 * Password Decorator
 * Adds utility methods for hashing and comparing passwords to the Fastify instance
 * @param {import("fastify").FastifyInstance} fastify - Fastify instance
 * @param {Object} opts - Options for the plugin
 * @param {number} [opts.saltRounds=10] - Number of salt rounds for bcrypt hashing
 */
async function passwordDecorator(fastify, opts) {
  // Set the number of salt rounds, defaulting to 10 if not provided
  const saltRounds = opts.saltRounds ?? 10;

  // Add a method to hash passwords
  fastify.decorate("hashPassword", async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password using bcrypt
    return hashedPassword; // Return the hashed password
  });

  // Add a method to compare a password with a hashed password
  fastify.decorate("comparePassword", async (password, hash) => {
    const isMatch = await bcrypt.compare(password, hash); // Compare the password with the hash
    return isMatch; // Return true if they match, false otherwise
  });
}

// Export the decorator as a Fastify plugin
export default fastifyPlugin(passwordDecorator);
