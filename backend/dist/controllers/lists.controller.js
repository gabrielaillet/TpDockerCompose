"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodoListItems = exports.delListItem = exports.putListItem = exports.addListItem = exports.changeList = exports.addList = void 0;
exports.listLists = listLists;
const addList = async (request, reply) => {
    const list = request.body;
    console.log(`Adding new list: ${JSON.stringify(list)}`);
    try {
        await request.server.level.db.put(list.id, JSON.stringify(list));
        reply.send(list);
    }
    catch (err) {
        console.error(`Error adding list: ${JSON.stringify(list)}`, err);
        reply.status(500).send({ error: "Internal Server Error" });
    }
};
exports.addList = addList;
const changeList = async (request, reply) => {
    const { id } = request.params;
    const { name, description } = request.body;
    console.log(`Updating list with ID: ${id}`);
    try {
        const value = await request.server.level.db.get(id);
        const list = JSON.parse(value);
        if (name)
            list.name = name;
        if (description)
            list.description = description;
        await request.server.level.db.put(id, JSON.stringify(list));
        reply.send(list);
    }
    catch (err) {
        console.error(`Error updating list with ID: ${id}`, err);
        reply.status(404).send({ error: "List not found" });
    }
};
exports.changeList = changeList;
const addListItem = async (request, reply) => {
    const { id } = request.params;
    const item = request.body;
    console.log(`Adding item to list with ID: ${id}`);
    try {
        const value = await request.server.level.db.get(id);
        const list = JSON.parse(value);
        if (!list.items)
            list.items = [];
        list.items.push(item);
        await request.server.level.db.put(id, JSON.stringify(list));
        reply.send(item);
    }
    catch (err) {
        console.error(`Error adding item to list with ID: ${id}`, err);
        reply.status(404).send({ error: "List not found" });
    }
};
exports.addListItem = addListItem;
const putListItem = async (request, reply) => {
    const { id, idItem } = request.params;
    const { name, status } = request.body;
    console.log(`Updating item with ID: ${idItem} in list with ID: ${id}`);
    try {
        const value = await request.server.level.db.get(id);
        const list = JSON.parse(value);
        const item = list.items?.find((item) => item.id === idItem);
        if (!item) {
            reply.status(404).send({ error: "Item not found" });
            return;
        }
        if (name)
            item.name = name;
        if (status)
            item.status = status;
        await request.server.level.db.put(id, JSON.stringify(list));
        reply.send(item);
    }
    catch (err) {
        console.error(`Error updating item with ID: ${idItem} in list with ID: ${id}`, err);
        reply.status(404).send({ error: "List not found" });
    }
};
exports.putListItem = putListItem;
const delListItem = async (request, reply) => {
    const { id, idItem } = request.params;
    console.log(`Deleting item with ID: ${idItem} from list with ID: ${id}`);
    try {
        const value = await request.server.level.db.get(id);
        const list = JSON.parse(value);
        const itemIndex = list.items?.findIndex((item) => item.id === idItem);
        if (itemIndex === undefined || itemIndex === -1) {
            reply.status(404).send({ error: "Item not found" });
            return;
        }
        list.items?.splice(itemIndex, 1);
        await request.server.level.db.put(id, JSON.stringify(list));
        reply.send({ id, idItem });
    }
    catch (err) {
        console.error(`Error deleting item with ID: ${idItem} from list with ID: ${id}`, err);
        reply.status(404).send({ error: "List not found" });
    }
};
exports.delListItem = delListItem;
async function listLists(request, reply) {
    console.log("DB status", request.server.level.db.status);
    const listsIter = request.server.level.db.iterator();
    const result = [];
    for await (const [key, value] of listsIter) {
        result.push(JSON.parse(value));
    }
    reply.send({ data: result });
}
const getTodoListItems = async (request, reply) => {
    const { id } = request.params;
    console.log(`Fetching items for list with ID: ${id}`);
    try {
        const value = await request.server.level.db.get(id);
        console.log(`Retrieved value from DB: ${value}`);
        const list = JSON.parse(value);
        console.log(`Parsed list: ${JSON.stringify(list)}`);
        if (list.items) {
            console.log(`List items found: ${JSON.stringify(list.items)}`);
            reply.send({ data: list.items });
        }
        else {
            console.log(`No items found for list with ID: ${id}`);
            reply.send({ data: [] });
        }
    }
    catch (err) {
        console.error(`Error fetching list with ID: ${id}`, err);
        reply.status(404).send({ error: "List not found" });
    }
};
exports.getTodoListItems = getTodoListItems;
//# sourceMappingURL=lists.controller.js.map