import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("admin123", 10); // 👈 password in chiaro che userai nel login

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password,
      role: "admin",
    },
  });

  console.log("✅ Admin creato o aggiornato");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
