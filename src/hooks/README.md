# Hooks

Hooks are used to tap into Fastify's lifecycle (e.g. `preHandler`, `onRequest`).

This folder contains reusable lifecycle hooks such as:

- Hashing passwords before user creation
- Verifying access tokens
- Logging requests or errors

Hooks are modular and can be attached per route or globally.
