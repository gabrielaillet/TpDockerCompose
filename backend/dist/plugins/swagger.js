"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const cors_1 = __importDefault(require("@fastify/cors"));
const all_json_1 = __importDefault(require("../schemas/all.json"));
exports.default = (0, fastify_plugin_1.default)(async (fastify) => {
    fastify.register(cors_1.default, {
        origin: "*",
        methods: ["GET", "PUT", "POST", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    });
    fastify.addHook("onSend", (request, reply, payload, done) => {
        console.log("CORS headers:", reply.getHeaders());
        done();
    });
    fastify.addSchema({
        $id: "ITodoList",
        ...all_json_1.default.definitions.ITodoList,
    });
    fastify.addSchema({
        $id: "IItem",
        ...all_json_1.default.definitions.IItem,
    });
    fastify.addSchema({
        $id: "Status",
        ...all_json_1.default.definitions.Status,
    });
    fastify.register(swagger_1.default, {
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
//# sourceMappingURL=swagger.js.map