import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const lists = ["Work Tasks", "Personal Tasks", "Shopping List"];
const listItems: Record<string, string[]> = {
  "Work Tasks": [
    "Buy groceries",
    "Complete React project",
    "Exercise for 30 minutes",
    "Read a book chapter",
  ],
  "Personal Tasks": [
    "Buy groceries",
    "Complete React project",
    "Exercise for 30 minutes",
    "Read a book chapter",
  ],
  "Shopping List": [
    "Buy groceries",
    "Complete React project",
    "Exercise for 30 minutes",
    "Read a book chapter",
  ],
};

export const apiClient = {
  getLists: async () => {
    try {
      return axios.get("http://localhost:3000/lists/").then((res) => {
        console.log(res.data);
        return res.data;
      });
    } catch (error) {
      console.error(error);
    }
  },
  addList: async (listName: string) => {
    return axios
      .post("http://localhost:3000/lists/", {
        id: uuidv4(),
        name: listName,
      })
      .then((res) => res.data);
  },
  getTodos: async (listId: string): Promise<string[]> => {
    return axios
      .get(`http://localhost:3000/lists/${listId}`)
      .then((res) => res.data);
  },
  addTodo: async (listId: string, todo: string) => {
    return axios
      .post(`http://localhost:3000/lists/${listId}/items`, {
        idItem: uuidv4(),
        name: todo,
      })
      .then((res) => res.data);
  },
};
