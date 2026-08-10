import prisma from "../src/lib/prisma.js";

async function seed() {
  await prisma.user.deleteMany({
    where: { email: "admin1@example.com" },
  });

  // 2. Create the user explicitly
  const user = await prisma.user.create({
    data: {
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
    console.error(">< Seed Error ><", err.message);
    console.error(">< Seed Error ><", err.stack);
    await prisma.$disconnect();
    process.exit(1);
  });
