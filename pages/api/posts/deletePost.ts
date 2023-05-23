import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({ message: "sign in to post something" });
    try {
      const query = req.query;
      const { id } = query;
      const result = await prisma.post.delete({ where: { id: id } });
      res.status(200).json(result);
    } catch (err) {
      const id = req.query;
      res.status(403).json({
        error: "error occured while deleting",
        postid: id,
        err1: err,
      });
    }
  }
}
