import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({ message: "sign in to post something" });
    try {
      const result = await prisma.user.findUnique({
        //@ts-ignore
        where: { email: session?.user?.email },
        include: {
          posts: {
            orderBy: { createdAt: "desc" },
            include: { comments: true },
          },
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ error: "error occured while posting" });
    }
  }
}
