import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';

const usersPath = path.join(process.cwd(), 'data', 'users.json');

export async function POST(request: Request) {
  const { action, email, password } = await request.json();

  const users = JSON.parse(await fs.readFile(usersPath, 'utf-8'));

  if (action === 'register') {
    const existingUser = users.find((user: any) => user.email === email);
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), email, password: hashedPassword };
    users.push(newUser);
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } else if (action === 'login') {
    const user = users.find((user: any) => user.email === email);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login successful', userId: user.id }, { status: 200 });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}