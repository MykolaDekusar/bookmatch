import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("admin123", 10);

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
