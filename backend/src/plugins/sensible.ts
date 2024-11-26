import fp from "fastify-plugin";
import level, { FastifyLeveldbOptions } from "@fastify/leveldb";
import { join } from "path";

export default fp<FastifyLeveldbOptions>(async (fastify) => {
  const dbPath = join(__dirname, "../../db");
  fastify.register(level, { name: "db", path: dbPath });
});
