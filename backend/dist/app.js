"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.app = void 0;
const path_1 = require("path");
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const autoload_1 = __importDefault(require("@fastify/autoload"));
const lists_1 = __importDefault(require("./routes/lists"));
const options = {};
exports.options = options;
const app = async (fastify, opts) => {
    fastify.register(lists_1.default);
    void fastify.register(autoload_1.default, {
        dir: (0, path_1.join)(__dirname, "plugins"),
        options: opts,
    });
    void fastify.register(autoload_1.default, {
        dir: (0, path_1.join)(__dirname, "routes"),
        options: opts,
    });
    void fastify.register(swagger_ui_1.default, {
        routePrefix: "/api-docs",
    });
};
exports.app = app;
exports.default = app;
const fastify_1 = __importDefault(require("fastify"));
const server = (0, fastify_1.default)();
server.register(app);
server.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
//# sourceMappingURL=app.js.map