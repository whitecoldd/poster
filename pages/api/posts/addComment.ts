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
    const { title, postId } = req.body.data;
    const user = await prisma.user.findUnique({
      //@ts-ignore
      where: { email: session.user?.email },
    });

    if (title.length > 300)
      return res.status(403).json({
        message: "write a shorter comment",
      });
    if (!title.length)
      return res.status(403).json({
        message: "write a longer comment",
      });
    try {
      const result = await prisma.comment.create({
        //@ts-ignore
        data: { comment: title, userId: user?.id, postId },
      });
      res.status(200).json(result);
    } catch (error) {
      const { title, postId } = req.body;
      res.status(403).json({
        error: "error occured while commenting",
        title: title,
        postId: postId,
      });
    }
  }
}
