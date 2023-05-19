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
      return res
        .status(401)
        .json({ message: "please sign in to post something" });
    const title = req.body.title;

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    if (title.length > 300)
      return res.status(403).json({
        message:
          "You exceeded maximum character limit. Please keep your posts short",
      });
    if (title.length === 0)
      return res.status(403).json({
        message: "You can't post an empty message. Write something first",
      });
    try {
      const result = await prisma.post.create({
        data: { title, userId: user.id },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ error: "Error occured while posting" });
    }
  }
}
