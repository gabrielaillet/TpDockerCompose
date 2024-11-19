import axios from 'axios';

const lists = ['Work Tasks', 'Personal Tasks', 'Shopping List']
const listItems: Record<string, string[]> = {
    'Work Tasks': ['Buy groceries', 'Complete React project', 'Exercise for 30 minutes', 'Read a book chapter'],
    'Personal Tasks': ['Buy groceries', 'Complete React project', 'Exercise for 30 minutes', 'Read a book chapter'],
    'Shopping List': ['Buy groceries', 'Complete React project', 'Exercise for 30 minutes', 'Read a book chapter']
}

export const apiClient = {
  getLists: async () => {
    return axios.get('http://172.18.0.2:3000/lists')
      .then(res => res.data)
  },
    addList: async (listName: string) => {
        lists.push(listName)
        console.debug('-- addList', listName, lists);
        return Promise.resolve(lists)
    },
    getTodos: async (listName: string): Promise<string[]> => {
        return Promise.resolve(listItems[listName])
    },
    addTodo: async (listName: string, todo: string) => {
        console.debug('-- addTodo', listName, todo, listItems);
        if (!listItems[listName]) {
            listItems[listName] = []
        }
        listItems[listName].push(todo)
        return Promise.resolve(listItems[listName])
    }
}