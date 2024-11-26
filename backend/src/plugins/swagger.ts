import fp from "fastify-plugin";
import swagger, { FastifySwaggerOptions } from "@fastify/swagger";
import cors from "@fastify/cors";
import JsonSchemas from "../schemas/all.json";

export default fp<FastifySwaggerOptions>(async (fastify) => {
  // Register CORS plugin
  fastify.register(cors, {
    origin: "*", // Allow all origins. Adjust this as needed for your security requirements.
    methods: ["GET", "PUT", "POST", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  });

  fastify.addHook("onSend", (request, reply, payload, done) => {
    console.log("CORS headers:", reply.getHeaders());
    done();
  });

  fastify.addSchema({
    $id: "ITodoList",
    ...JsonSchemas.definitions.ITodoList,
  });
  fastify.addSchema({
    $id: "IItem",
    ...JsonSchemas.definitions.IItem,
  });
  // Register schemas by referencing `definitions` directly
  fastify.addSchema({
    $id: "Status",
    ...JsonSchemas.definitions.Status,
  });

  fastify.register(swagger, {
    openapi: {
      info: { title: "Todo API", version: "1.0.0" },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development server",
        },
      ],
    },
  });
});
