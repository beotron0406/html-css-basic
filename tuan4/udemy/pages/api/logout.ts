import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  res.setHeader("Set-Cookie", "userEmail=; HttpOnly; Path=/; Max-Age=0");

  res.status(200).json({ message: "Logged out successfully" });
}
