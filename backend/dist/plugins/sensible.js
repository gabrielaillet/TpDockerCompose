"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const leveldb_1 = __importDefault(require("@fastify/leveldb"));
const path_1 = require("path");
exports.default = (0, fastify_plugin_1.default)(async (fastify) => {
    const dbPath = (0, path_1.join)(__dirname, "../../db");
    fastify.register(leveldb_1.default, { name: "db", path: dbPath });
});
//# sourceMappingURL=sensible.js.map