export default class UserService {
  /**
   * UserService constructor
   * @param {import("fastify").FastifyInstance} fastify - Fastify instance for dependency injection
   */
  constructor(fastify) {
    this.fastify = fastify;
    this.collection = fastify.mongo.client.db().collection("users"); // MongoDB users collection
  }

  /**
   * Converts a string MongoDB ID to an ObjectId
   * @param {string} mongoId - MongoDB ID as a string
   * @returns {ObjectId} - MongoDB ObjectId
   */
  createMongoIdObject(mongoId) {
    return new this.fastify.mongo.ObjectId(mongoId);
  }

  /**
   * Fetches all users from the database
   * @returns {Promise<Array>} - List of users with sensitive data removed
   */
  async getUsers() {
    const users = (await this.collection.find().toArray()).map((doc) => {
      delete doc.password; // Remove sensitive password field
      return {
        id: doc._id.toString(),
        ...doc,
      };
    });

    return users;
  }

  /**
   * Fetches a single user by ID
   * @param {string} id - User ID
   * @returns {Promise<Object>} - User object with sensitive data removed
   * @throws {Error} - If user is not found
   */
  async getUserById(id) {
    const user = await this.collection.findOne({
      _id: this.createMongoIdObject(id),
    });

    if (!user) {
      throw this.fastify.httpErrors.notFound("User not found");
    }

    delete user.password; // Remove sensitive password field

    return {
      id: user._id.toString(),
      ...user,
    };
  }

  /**
   * Updates a user by ID
   * @param {string} id - User ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>} - Updated user object
   * @throws {Error} - If user is not found or update fails
   */
  async updateUserById(id, data) {
    const mongoId = this.createMongoIdObject(id);

    const user = await this.collection.findOne({
      _id: mongoId,
    });

    if (!user) {
      throw this.fastify.httpErrors.notFound("User not found");
    }

    // Hash the password if it is being updated
    if (data.password) {
      data.password = await this.fastify.hashPassword(data.password);
    }

    const updatedUser = await this.collection.updateOne(
      { _id: mongoId },
      { $set: data },
    );

    if (updatedUser.matchedCount === 0) {
      throw this.fastify.httpErrors.internalServerError("User not updated");
    }

    delete updatedUser.password; // Remove sensitive password field

    return {
      id,
      ...updatedUser,
    };
  }

  /**
   * Creates a new user
   * @param {Object} data - User data
   * @returns {Promise<Object>} - Created user object
   * @throws {Error} - If user already exists or creation fails
   */
  async createUser(data) {
    const hashedPassword = await this.fastify.hashPassword(data.password);
    data.password = hashedPassword;

    // Check if a user with the same email already exists
    const existingUser = await this.collection.findOne({ email: data.email });

    if (existingUser) {
      throw this.fastify.httpErrors.badRequest("User already exists");
    }

    const user = await this.collection.insertOne(data);

    if (!user.acknowledged) {
      throw this.fastify.httpErrors.internalServerError("User not created");
    }

    delete data.password; // Remove sensitive password field

    return {
      id: user.insertedId.toString(),
      ...data,
    };
  }

  /**
   * Deletes a user by ID
   * @param {string} id - User ID
   * @returns {Promise<Object>} - Deleted user object
   * @throws {Error} - If user is not found or deletion fails
   */
  async deleteUserById(id) {
    const mongoId = this.createMongoIdObject(id);

    const user = await this.collection.findOne({ _id: mongoId });

    if (!user) {
      throw this.fastify.httpErrors.notFound("User not found");
    }

    const result = await this.collection.deleteOne({
      _id: mongoId,
    });

    if (result.deletedCount === 0) {
      throw this.fastify.httpErrors.internalServerError(
        "Internal Server Error",
      );
    }

    delete user.password; // Remove sensitive password field

    return {
      id,
      ...user,
    };
  }
}
