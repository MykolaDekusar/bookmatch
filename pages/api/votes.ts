import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { value, bookId } = req.body;

    if (!value || !bookId) {
      return res.status(400).json({ error: "Missing value or bookId" });
    }

    await prisma.vote.create({
      data: { value, bookId },
    });

    const votes = await prisma.vote.findMany({
      where: { bookId },
    });

    const total = votes.reduce((acc, v) => acc + v.value, 0);
    const newAverage = votes.length ? total / votes.length : 0;

    res.status(200).json({ success: true, newAverage });
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
