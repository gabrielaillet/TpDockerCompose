import { FastifyReply, FastifyRequest } from "fastify";
import { ITodoList, IItem } from "../interfaces";

// Add a new list
export const addList = async (
  request: FastifyRequest<{ Body: ITodoList }>,
  reply: FastifyReply
) => {
  const list = request.body;
  console.log(`Adding new list: ${JSON.stringify(list)}`); // Debugging log

  try {
    await request.server.level.db.put(list.id, JSON.stringify(list));
    reply.send(list);
  } catch (err) {
    console.error(`Error adding list: ${JSON.stringify(list)}`, err); // Debugging log
    reply.status(500).send({ error: "Internal Server Error" });
  }
};

// Update an existing list
export const changeList = async (
  request: FastifyRequest<{ Params: { id: string }; Body: Partial<ITodoList> }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const { name, description } = request.body;
  console.log(`Updating list with ID: ${id}`); // Debugging log

  try {
    const value = await request.server.level.db.get(id);
    const list = JSON.parse(value) as ITodoList;

    if (name) list.name = name;
    if (description) list.description = description;

    await request.server.level.db.put(id, JSON.stringify(list));
    reply.send(list);
  } catch (err) {
    console.error(`Error updating list with ID: ${id}`, err); // Debugging log
    reply.status(404).send({ error: "List not found" });
  }
};

// Add an item to a specific list
export const addListItem = async (
  request: FastifyRequest<{ Params: { id: string }; Body: IItem }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const item = request.body;
  console.log(`Adding item to list with ID: ${id}`); // Debugging log

  try {
    const value = await request.server.level.db.get(id);
    const list = JSON.parse(value) as ITodoList;

    if (!list.items) list.items = [];
    list.items.push(item);

    await request.server.level.db.put(id, JSON.stringify(list));
    reply.send(item);
  } catch (err) {
    console.error(`Error adding item to list with ID: ${id}`, err); // Debugging log
    reply.status(404).send({ error: "List not found" });
  }
};

// Update an item in a specific list
export const putListItem = async (
  request: FastifyRequest<{
    Params: { id: string; idItem: string };
    Body: Partial<IItem>;
  }>,
  reply: FastifyReply
) => {
  const { id, idItem } = request.params;
  const { name, status } = request.body;
  console.log(`Updating item with ID: ${idItem} in list with ID: ${id}`); // Debugging log

  try {
    const value = await request.server.level.db.get(id);
    const list = JSON.parse(value) as ITodoList;

    const item = list.items?.find((item) => item.id === idItem);
    if (!item) {
      reply.status(404).send({ error: "Item not found" });
      return;
    }

    if (name) item.name = name;
    if (status) item.status = status;

    await request.server.level.db.put(id, JSON.stringify(list));
    reply.send(item);
  } catch (err) {
    console.error(
      `Error updating item with ID: ${idItem} in list with ID: ${id}`,
      err
    ); // Debugging log
    reply.status(404).send({ error: "List not found" });
  }
};

// Delete an item from a specific list
export const delListItem = async (
  request: FastifyRequest<{ Params: { id: string; idItem: string } }>,
  reply: FastifyReply
) => {
  const { id, idItem } = request.params;
  console.log(`Deleting item with ID: ${idItem} from list with ID: ${id}`); // Debugging log

  try {
    const value = await request.server.level.db.get(id);
    const list = JSON.parse(value) as ITodoList;

    const itemIndex = list.items?.findIndex((item) => item.id === idItem);
    if (itemIndex === undefined || itemIndex === -1) {
      reply.status(404).send({ error: "Item not found" });
      return;
    }

    list.items?.splice(itemIndex, 1);
    await request.server.level.db.put(id, JSON.stringify(list));
    reply.send({ id, idItem });
  } catch (err) {
    console.error(
      `Error deleting item with ID: ${idItem} from list with ID: ${id}`,
      err
    ); // Debugging log
    reply.status(404).send({ error: "List not found" });
  }
};

export async function listLists(request: FastifyRequest, reply: FastifyReply) {
  console.log("DB status", request.server.level.db.status);
  const listsIter = request.server.level.db.iterator();

  const result: ITodoList[] = [];
  for await (const [key, value] of listsIter) {
    result.push(JSON.parse(value));
  }
  reply.send({ data: result });
}

export const getTodoListItems = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  console.log(`Fetching items for list with ID: ${id}`); // Debugging log

  try {
    const value = await request.server.level.db.get(id);
    console.log(`Retrieved value from DB: ${value}`); // Debugging log

    const list = JSON.parse(value) as ITodoList;
    console.log(`Parsed list: ${JSON.stringify(list)}`); // Debugging log

    if (list.items) {
      console.log(`List items found: ${JSON.stringify(list.items)}`); // Debugging log
      reply.send({ data: list.items });
    } else {
      console.log(`No items found for list with ID: ${id}`); // Debugging log
      reply.send({ data: [] });
    }
  } catch (err) {
    console.error(`Error fetching list with ID: ${id}`, err); // Debugging log
    reply.status(404).send({ error: "List not found" });
  }
};
