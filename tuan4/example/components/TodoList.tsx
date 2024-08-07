import React from "react";
interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  
  interface TodoListProps {
    todos: Todo[];
    onUpdate: (id: number, text: string, completed: boolean) => void;
    onDelete: (id: number) => void;
  }
  
  export default function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
    return (
      <ul className="mt-4">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center bg-gray-100 p-2 mb-2 rounded">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onUpdate(todo.id, todo.text, !todo.completed)}
              className="mr-2"
            />
            <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
            <button
              onClick={() => {
                const newText = prompt('Edit todo:', todo.text);
                if (newText) onUpdate(todo.id, newText, todo.completed);
              }}
              className="ml-auto mr-2 text-blue-500"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }