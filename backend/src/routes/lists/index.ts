import { FastifyInstance } from "fastify";
import * as listsController from "../../controllers/lists.controller";
import {
  listListsSchema,
  addListSchema,
  changeListSchema,
  addListItemSchema,
  putListItemSchema,
  delListItemSchema,
  getTodoListItemsSchema,
} from "../../schemas";

async function lists(fastify: FastifyInstance) {
  fastify.get("/", { schema: listListsSchema }, listsController.listLists);
  fastify.post("/", { schema: addListSchema }, listsController.addList);
  fastify.put("/:id", { schema: changeListSchema }, listsController.changeList);
  fastify.post(
    "/:id/items",
    { schema: addListItemSchema },
    listsController.addListItem
  );
  fastify.put(
    "/:id/items/:idItem",
    { schema: putListItemSchema },
    listsController.putListItem
  );
  fastify.delete(
    "/:id/items/:idItem",
    { schema: delListItemSchema },
    listsController.delListItem
  );

  fastify.get(
    "/:id/items",
    { schema: getTodoListItemsSchema },
    listsController.getTodoListItems
  );
}

export default lists;
