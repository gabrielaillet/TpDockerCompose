import { FastifyInstance } from "fastify";
import * as listsController from "../../controllers/lists.controller";
import {
  listListsSchema,
  addListSchema,
  changeListSchema,
  addListItemSchema,
  putListItemSchema,
  delListItemSchema,
} from "../../schemas";
async function lists(fastify: FastifyInstance) {
  fastify.get("/", listsController.listLists);
  fastify.post("/", listsController.addList);
  fastify.put("/:id", listsController.changeList);
  fastify.post("/:id/items", listsController.addListItem);
  fastify.put("/:id/items/:idItem", listsController.putListItem);
  fastify.delete("/:id/items/:idItem", listsController.delListItem);
}

export default lists;
