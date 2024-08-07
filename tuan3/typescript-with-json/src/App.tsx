import React, { useState, useEffect } from "react";
import "./App.css";

interface TodoItem {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [newTodo, setNewTodo] = useState<Omit<TodoItem, "id">>({
    title: "",
    completed: false,
    userId: 1,
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data as TodoItem[]));
  }, []);

  const handleButtonClick = () => {
    setShowTable(!showTable);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewTodo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newId =
      todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    const todoToAdd = { ...newTodo, id: newId };

    setTodos((prev) => [...prev, todoToAdd]);

    setNewTodo({
      title: "",
      completed: false,
      userId: 1,
    });
  };

  return (
    <div className="App">
      <button className="toggle-button" onClick={handleButtonClick}>
        {showTable ? "Ẩn bảng" : "Hiện bảng"}
      </button>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          name="title"
          value={newTodo.title}
          onChange={handleInputChange}
          placeholder="Tiêu đề todo"
          required
        />
        <label>
          <input
            type="checkbox"
            name="completed"
            checked={newTodo.completed}
            onChange={handleInputChange}
          />
          Hoàn thành
        </label>
        <input
          type="number"
          name="userId"
          value={newTodo.userId}
          onChange={handleInputChange}
          placeholder="User ID"
          required
        />
        <button type="submit">Thêm Todo</button>
      </form>

      {showTable && (
        <table className="todo-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tiêu đề</th>
              <th>Hoàn thành</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.completed ? "Có" : "Không"}</td>
                <td>{todo.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
