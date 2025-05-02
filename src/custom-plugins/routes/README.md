# Custom Plugins 

This folder contains custom plugins structured according to Fastify's plugin system.  
It includes route handlers and JSON schemas that are registered as plugins using `fastify.register()`.

Currently, it consists of:

- `routes/`: Custom route files acting as Fastify plugins
- `schemas/`: JSON Schemas for request/response validation using Fluent JSON Schema

These are not third-party plugins from the Fastify ecosystem, but internal plugins that extend application logic modularly.
