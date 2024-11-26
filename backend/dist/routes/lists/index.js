"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const listsController = __importStar(require("../../controllers/lists.controller"));
const schemas_1 = require("../../schemas");
async function lists(fastify) {
    fastify.get("/", { schema: schemas_1.listListsSchema }, listsController.listLists);
    fastify.post("/", { schema: schemas_1.addListSchema }, listsController.addList);
    fastify.put("/:id", { schema: schemas_1.changeListSchema }, listsController.changeList);
    fastify.post("/:id/items", { schema: schemas_1.addListItemSchema }, listsController.addListItem);
    fastify.put("/:id/items/:idItem", { schema: schemas_1.putListItemSchema }, listsController.putListItem);
    fastify.delete("/:id/items/:idItem", { schema: schemas_1.delListItemSchema }, listsController.delListItem);
    fastify.get("/:id/items", { schema: schemas_1.getTodoListItemsSchema }, listsController.getTodoListItems);
}
exports.default = lists;
//# sourceMappingURL=index.js.map