import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'app/data/data.json');

function readData() {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function getNextId(websiteInfos: any[]): string {
  if (websiteInfos.length === 0) return "1";
  const maxId = Math.max(...websiteInfos.map(info => parseInt(info.id, 10)));
  return (maxId + 1).toString();
}

function createOrderedInfo(id: string, { title, description, contactEmail }: any) {
  return {
    id,
    title,
    description,
    contactEmail
  };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    case 'PUT':
      return handlePut(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const data = readData();
  res.status(200).json({ websiteInfos: data.websiteInfos || [] });
}

function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const data = readData();
  if (!data.websiteInfos) {
    data.websiteInfos = [];
  }
  const newId = getNextId(data.websiteInfos);
  const newInfo = createOrderedInfo(newId, req.body);
  data.websiteInfos.push(newInfo);
  writeData(data);
  res.status(201).json({ message: 'Thêm mới thành công', info: newInfo });
}

function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const data = readData();
  const { id } = req.query;
  const index = data.websiteInfos.findIndex((info: any) => info.id === id);

  if (index !== -1) {
    const updatedInfo = { ...data.websiteInfos[index], ...req.body, id };
    data.websiteInfos[index] = updatedInfo;
    writeData(data);
    res.status(200).json({ message: 'Cập nhật thành công', info: updatedInfo });
  } else {
    res.status(404).json({ message: 'Không tìm thấy thông tin website' });
  }
}

function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const data = readData();
  const { id } = req.query;
  const index = data.websiteInfos.findIndex((info: any) => info.id === id);

  if (index !== -1) {
    data.websiteInfos.splice(index, 1);
    writeData(data);
    res.status(200).json({ message: 'Xóa thành công' });
  } else {
    res.status(404).json({ message: 'Không tìm thấy thông tin website' });
  }
}
