'use client';
import AuthCheck from '@/components/AuthCheck';
import { useState, useEffect } from 'react';
import TodoList from '@/components/TodoList';
import AddTodo from '@/components/AddTodo';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async (text: string) => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
  };

  const updateTodo = async (id: number, text: string, completed: boolean) => {
    const response = await fetch('/api/todos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, text, completed }),
    });
    const updatedTodo = await response.json();
    setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
  };

  const deleteTodo = async (id: number) => {
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <AuthCheck>
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>
        <AddTodo onAdd={addTodo} />
        <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
      </div>
    </AuthCheck>
  );
}