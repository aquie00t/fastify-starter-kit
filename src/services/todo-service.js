import { ObjectId } from "@fastify/mongodb";

export default class TodoService {
  /**
   * Initializes the TodoService with a Fastify instance.
   * @param {import("fastify").FastifyInstance} fastify - The Fastify instance.
   */
  constructor(fastify) {
    this.fastify = fastify;
  }

  /**
   * Retrieves the todos collection from the MongoDB database.
   * @returns {Promise<import("mongodb").Collection>} The todos collection.
   */
  async collection() {
    return await this.fastify.mongo.client.db().collection("todos");
  }

  /**
   * Fetches all todos from the database.
   * @returns {Promise<Array>} An array of todos.
   * @example
   * const todos = await todoService.getTodos();
   * console.log(todos);
   * // [
   * //   {
   * //     id: "1234567890",
   * //     title: "Todo 1",
   * //     description: "Todo 1 description",
   * //     isCompleted: false,
   * //     createdAt: "2023-01-01T00:00:00.000Z",
   * //     updatedAt: "2023-01-01T00:00:00.000Z",
   * //   },
   * //   {
   * //     id: "0987654321",
   * //     title: "Todo 2",
   * //     description: "Todo 2 description",
   * //     isCompleted: true,
   * //     createdAt: "2023-01-02T00:00:00.000Z",
   * //     updatedAt: "2023-01-02T00:00:00.000Z",
   * //   },
   * // ]
   */
  async getTodos() {
    const todos = (await (await this.collection()).find().toArray()).map(
      (doc) => {
        return {
          id: doc._id,
          ...doc,
        };
      },
    );

    return todos;
  }

  /**
   * Fetches a single todo by its ID.
   * @param {string} id - The ID of the todo.
   * @returns {Promise<Object|null>} The todo object or null if not found.
   */
  async getTodoById(id) {
    const todo = await (
      await this.collection()
    ).findOne({ _id: new ObjectId(id) });

    if (!todo) {
      return null;
    }

    return {
      id: todo._id,
      ...todo,
    };
  }

  /**
   * Creates a new todo in the database.
   * @param {Object} body - The todo data.
   * @param {string} body.title - The title of the todo.
   * @param {string} body.description - The description of the todo.
   * @param {boolean} body.isCompleted - The completion status of the todo.
   * @param {string} body.createdAt - The creation timestamp.
   * @param {string} body.updatedAt - The update timestamp.
   * @returns {Promise<Object>} The newly created todo.
   */
  async createTodo(body) {
    const { title, description, isCompleted, createdAt, updatedAt } = body;

    const newTodo = {
      title,
      description,
      isCompleted,
      createdAt,
      updatedAt,
    };

    await (await this.collection()).insertOne(newTodo);

    return newTodo;
  }

  /**
   * Updates an existing todo in the database.
   * @param {string} id - The ID of the todo to update.
   * @param {Object} body - The updated todo data.
   * @param {string} body.title - The updated title of the todo.
   * @param {string} body.description - The updated description of the todo.
   * @param {boolean} body.isCompleted - The updated completion status.
   * @returns {Promise<Object>} The updated todo object.
   */
  async updateTodo(id, body) {
    const { title, description, isCompleted } = body;

    const updatedTodo = {
      title,
      description,
      isCompleted,
    };

    await (
      await this.collection()
    ).updateOne({ _id: new ObjectId(id) }, { $set: updatedTodo });

    return updatedTodo;
  }

  /**
   * Deletes a todo from the database.
   * @param {string} id - The ID of the todo to delete.
   * @returns {Promise<Object>} The result of the delete operation.
   */
  async deleteTodo(id) {
    const result = (await this.collection()).deleteOne({
      _id: new ObjectId(id),
    });

    return result;
  }
}
