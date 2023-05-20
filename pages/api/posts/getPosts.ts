import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const result = await prisma.post.findMany({
        include: { user: true, comments: true },
        orderBy: { createdAt: "desc" },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ error: "error occured while getting posts" });
    }
  }
}
