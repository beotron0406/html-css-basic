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
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const userEmail = req.cookies.userEmail; 

  if (!userEmail) {
    return res.status(401).json({ isLoggedIn: false });
  }

  const usersFilePath = path.join(process.cwd(), 'app/data/users.json');
  const usersData = fs.readFileSync(usersFilePath, 'utf8');
  const users: User[] = JSON.parse(usersData);

  const user = users.find(u => u.email === userEmail);

  if (!user) {
    return res.status(401).json({ isLoggedIn: false });
  }

  res.status(200).json({ 
    isLoggedIn: true,
    user: { 
      email: user.email, 
      role: user.role, 
      phone: user.phone 
    } 
  });
}