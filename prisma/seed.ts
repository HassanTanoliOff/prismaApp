import prisma from "../src/lib/prisma.js";

async function seed() {
  const user = await prisma.user.upsert({
    where: { email: "admin1@example.com" },
    update: { role: "ADMIN" },
    create: {
      user_name: "admin1",
      email: "admin1@example.com",
      role: "ADMIN",
    },
  });
  console.log("Admin seeded:", user);
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
