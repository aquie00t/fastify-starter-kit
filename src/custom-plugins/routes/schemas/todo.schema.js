import S from "fluent-json-schema";

export const todoSchema = S.object()
  .prop("id", S.string())
  .prop("title", S.string())
  .prop("description", S.string())
  .prop("isCompleted", S.boolean())
  .prop("createdAt", S.string().format("date-time"))
  .prop("updatedAt", S.string().format("date-time"));

export const todoArraySchema = S.array().items(todoSchema);

export const todoCreateBodySchema = S.object()
  .prop("title", S.string())
  .required()
  .prop("description", S.string())
  .required()
  .prop("isCompleted", S.boolean().default(false));

export const todoUpdateBodySchema = S.object()
  .prop("title", S.string())
  .prop("description", S.string())
  .prop("isCompleted", S.boolean());
