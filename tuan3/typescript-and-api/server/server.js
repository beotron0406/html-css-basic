// server/server.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const TODO_FILE = path.join(__dirname, 'todos.json');

// Đọc todos
app.get('/todos', async (req, res) => {
  try {
    const data = await fs.readFile(TODO_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Error reading todos' });
  }
});

// Thêm todo mới
app.post('/todos', async (req, res) => {
  try {
    const newTodo = req.body;
    const data = await fs.readFile(TODO_FILE, 'utf8');
    const todos = JSON.parse(data);
    
    newTodo.id = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    todos.push(newTodo);
    
    await fs.writeFile(TODO_FILE, JSON.stringify(todos, null, 2));
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Error adding todo' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});