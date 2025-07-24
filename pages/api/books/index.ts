import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const books = await prisma.book.findMany({
      include: { votes: true },
    });

    const booksWithRating = books.map((book) => {
      const total = book.votes.reduce((acc, vote) => acc + vote.value, 0);
      const averageRating = book.votes.length
        ? total / book.votes.length
        : null;
      const voteCounts = [1, 2, 3, 4, 5].map((value) => ({
        stars: value,
        count: book.votes.filter((v) => v.value === value).length,
      }));
      return {
        ...book,
        averageRating,
        voteCounts,
      };
    });

    res.status(200).json(booksWithRating);
  } else if (req.method === "POST") {
    const { title, author, genre } = req.body;

    if (!title || !author || !genre) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newBook = await prisma.book.create({
      data: { title, author, genre },
    });

    res.status(201).json(newBook);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
