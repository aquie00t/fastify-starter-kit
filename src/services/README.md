# Services (Business Logic)

Services contain the business logic of your application. This includes:

- Interacting with the database
- Data processing
- Utility operations

Each service should be independent of Fastify (no request/reply logic).
For example:

- `userService.js`: createUser, getUserByEmail
- `todoService.js`: getUserTodos, createTodo

> Services improve testability and keep your routes/controllers clean.
