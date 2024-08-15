import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface User {
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user';
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  const usersFilePath = path.join(process.cwd(), 'app/data/users.json');
  const usersData = fs.readFileSync(usersFilePath, 'utf8');
  const users: User[] = JSON.parse(usersData);

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Thông tin đăng nhập không chính xác' });
  }
  res.setHeader('Set-Cookie', `userEmail=${user.email}; HttpOnly; Path=/; Max-Age=3600`);

  res.status(200).json({ 
    user: { 
      email: user.email, 
      role: user.role, 
      phone: user.phone 
    } 
  });
}