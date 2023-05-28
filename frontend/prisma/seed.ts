import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const users = [
    { email: "general.user.a@example.com", name: "UserA", role: "general" },
    { email: "general.user.b@example.com", name: "UserB", role: "general" },
    { email: "general.user.b@example.com", name: "UserB", role: "general" },
  ];
  await Promise.all(
    users.map(async ({ email, name, role }) => {
      await prisma.user.upsert({
        where: { email },
        update: { name, role },
        create: {
          email,
          name,
          role,
        },
      });
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
