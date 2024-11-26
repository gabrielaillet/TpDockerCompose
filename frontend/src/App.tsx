import { Button, Layout, List, Menu, MenuProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { apiClient } from "./api-client";
import { useEffect, useState } from "react";
import { ListForm } from "./ListForm";
import { TodoForm } from "./TodoForm";
const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
type ListType = { id: string; name: string };
type TodoType = { id: string; name: string };

export default function App() {
  const [lists, setLists] = useState<ListType[]>([]);
  const [selectedList, setSelectedList] = useState<ListType | null>(null);
  const [showListForm, setShowListForm] = useState(false);
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [selectedListItems, setSelectedListItems] = useState<TodoType[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    apiClient
      .getLists()
      .then((response) => {
        setLists(response.data);
      })
      .catch(() => {
        setLists([]);
      });
  }, []);

  useEffect(() => {
    if (selectedList) {
      apiClient
        .getTodos(selectedList.id)
        .then((response) => {
          if (Array.isArray(response)) {
            setSelectedListItems(
              response.map((item: any) => ({
                id: item.id,
                name: item.name,
              }))
            );
          } else {
            setSelectedListItems([]);
          }
        })
        .catch(() => {
          setSelectedListItems([]);
        });
    }
  }, [selectedList]);

  const handleItemClick = (key: string) => {
    if (key === "add") {
      setSelectedList(null);
      setShowListForm(true);
    } else {
      const list = lists.find((list) => list.id === key) || null;
      setSelectedList(list);
    }
  };
  useEffect(() => {
    console.log(lists.length);
    setItems(
      lists.map((list) => ({
        key: list.id,
        label: list.name,
      }))
    );
  }, [lists.length]);
  function handleListAdded(listName: string): void {
    apiClient.addList(listName).then((result) => {
      if (Array.isArray(result)) {
        setLists(result);
      }
    });
    setShowListForm(false);
  }

  function handleTodoAdded(todo: string): void {
    if (selectedList) {
      apiClient.addTodo(selectedList.id, todo).then((response) => {
        if (Array.isArray(response)) {
          setSelectedListItems(response);
        }
      });
    }
    setShowTodoForm(false);
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center", color: "white" }}>
        TODO LISTS
      </Header>
      <Layout>
        <Sider width={200} style={{ background: "black" }}>
          <Menu
            theme="dark"
            mode="inline"
            items={[
              { key: "add", label: "Add list", icon: <PlusOutlined /> },
              ...items,
            ]}
            onClick={(e) => handleItemClick(e.key)}
          />
        </Sider>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {showListForm && <ListForm onListAdded={handleListAdded} />}
          {selectedList && (
            <div>
              <Button onClick={() => setShowTodoForm(true)}>Add Todo</Button>
              <List
                dataSource={selectedListItems}
                renderItem={(item) => <List.Item>{item.name}</List.Item>}
              />
            </div>
          )}
          {!selectedList && !showListForm && <div>Select a list</div>}
          {showTodoForm && <TodoForm onTodoAdded={handleTodoAdded} />}
        </Content>
      </Layout>
    </Layout>
  );
}
