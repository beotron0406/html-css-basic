import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const todosPath = path.join(process.cwd(), 'data', 'todos.json');

export async function GET() {
  const todos = await fs.readFile(todosPath, 'utf-8');
  return NextResponse.json(JSON.parse(todos));
}

export async function POST(request: Request) {
  const { text } = await request.json();
  const todos = JSON.parse(await fs.readFile(todosPath, 'utf-8'));
  const newTodo = { id: Date.now(), text, completed: false };
  todos.push(newTodo);
  await fs.writeFile(todosPath, JSON.stringify(todos, null, 2));
  return NextResponse.json(newTodo, { status: 201 });
}

export async function PUT(request: Request) {
  const { id, text, completed } = await request.json();
  const todos = JSON.parse(await fs.readFile(todosPath, 'utf-8'));
  const index = todos.findIndex((todo: any) => todo.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], text, completed };
    await fs.writeFile(todosPath, JSON.stringify(todos, null, 2));
    return NextResponse.json(todos[index]);
  }
  return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const todos = JSON.parse(await fs.readFile(todosPath, 'utf-8'));
  const newTodos = todos.filter((todo: any) => todo.id !== id);
  await fs.writeFile(todosPath, JSON.stringify(newTodos, null, 2));
  return NextResponse.json({ success: true });
}