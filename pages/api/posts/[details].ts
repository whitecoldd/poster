import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.post.findUnique({
        //@ts-ignore
        where: { id: req.query.details },
        include: {
          user: true,
          comments: { orderBy: { createdAt: "desc" }, include: { user: true } },
        },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(403).json({ error: "error occured while posting" });
    }
  }
}
