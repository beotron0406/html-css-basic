import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const userData = req.body;
    
    const filePath = path.join(process.cwd(), 'app/data/users.json');
    const fileData = fs.readFileSync(filePath);
    const users = JSON.parse(fileData.toString());
    
    users.push(userData);
    
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    
    res.status(200).json({ message: 'Đăng ký thành công' });
  } else if (req.method === 'GET') {
    const filePath = path.join(process.cwd(), 'app/data/users.json');
    const fileData = fs.readFileSync(filePath);
    const users = JSON.parse(fileData.toString());
    
    res.status(200).json({ users });
  } else {
    res.status(404).json({ message: 'Method Not Allowed' });
  }
}