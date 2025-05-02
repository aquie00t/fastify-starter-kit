# Decorators

This folder contains Fastify decorators created using `fastify.decorate()`.

Decorators are methods or properties added to the Fastify instance (e.g. `fastify.hashPassword`) and are accessible in routes, services, and hooks.

Use decorators to:

- Add utility functions (e.g. password hashing, token generation)
- Inject shared logic across your app

> Make sure each decorator is registered using `fastify-plugin` for encapsulation support.
