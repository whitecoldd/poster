import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({ message: "sign in to post something" });
    const title = req.body.title;

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email }
    });

    if (title.length > 300)
      return res.status(403).json({
        message: "write a shorter post",
      });
    if (!title.length)
      return res.status(403).json({
        message: "write a longer post",
      });
    try {
      const result = await prisma.post.create({
        data: { title, userId: user?.id },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ error: "error occured while posting" });
    }
  }
}
