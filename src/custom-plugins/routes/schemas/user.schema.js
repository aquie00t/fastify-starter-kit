// Import Fluent JSON Schema for defining and validating schemas
import S from "fluent-json-schema";

// Schema for a single user object
export const userSchema = S.object()
  .prop("id", S.string()) // User ID as a string
  .prop("email", S.string().format("email")) // User email in valid email format
  .prop("name", S.string()) // User name as a string
  .prop("createdAt", S.string().format("date-time")) // Timestamp for when the user was created
  .prop("updatedAt", S.string().format("date-time")); // Timestamp for when the user was last updated

// Schema for an array of user objects
export const userArraySchema = S.array().items(userSchema); // Array containing user objects

// Schema for the request body when creating a new user
export const userCreateBodySchema = S.object()
  .prop("email", S.string().format("email")) // Email is required and must be in valid email format
  .required()
  .prop("name", S.string()) // Name is required
  .required()
  .prop("password", S.string()) // Password is required
  .required();

// Schema for the request body when updating an existing user
export const userUpdateBodySchema = S.object()
  .prop("email", S.string().format("email")) // Email is optional but must be in valid email format if provided
  .prop("name", S.string()) // Name is optional
  .prop("password", S.string()); // Password is optional
