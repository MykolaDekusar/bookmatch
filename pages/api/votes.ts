import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // assicurati che questo path sia corretto

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { bookId, value } = req.body;

  if (!bookId || value < 1 || value > 5) {
    return res.status(400).json({ error: "Dati non validi" });
  }

  try {
    const vote = await prisma.vote.create({
      data: { bookId: Number(bookId), value: Number(value) },
    });

    return res.status(201).json({ message: "Voto registrato", vote });
  } catch (error) {
    console.error("Errore durante il salvataggio del voto:", error);
    return res.status(500).json({ error: "Errore interno del server" });
  }
}
