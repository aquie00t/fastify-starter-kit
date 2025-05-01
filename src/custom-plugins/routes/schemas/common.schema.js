import S from "fluent-json-schema";

export const paramsWithIdSchema = S.object().prop("id", S.string()).required();

export const errorResponseSchema = S.object()
  .prop("message", S.string())
  .prop("statusCode", S.number())
  .prop("error", S.string());

export const noContentResponseSchema = S.null();
