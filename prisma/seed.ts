import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const password = await hash("admin123", 10);
  await prisma.book.createMany({
    data: [
      {
        title: "1984",
        author: "George Orwell",
        genre: "Distopia",
        year: 1949,
      },
      {
        title: "Il Nome della Rosa",
        author: "Umberto Eco",
        genre: "Giallo storico",
        year: 1980,
      },
      {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        year: 1937,
      },
    ],
  });

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password,
      role: "admin",
    },
  });

  console.log("✅ Admin creato");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
