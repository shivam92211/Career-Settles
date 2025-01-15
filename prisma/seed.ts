import { PrismaClient } from "@prisma/client";
import { hash } from 'bcryptjs'

const prisma = new PrismaClient();

async function main() {

    const passsword = await hash('test', 12)
    const user = await prisma.user.upsert({
        where: { email: 'test@test.com' },
        update: {},
        create: {
            email: 'test@test.com',
            password: passsword,
            role: "TEACHER",
            
        }
    })
  // Seed User data
//   const users = [
//     {
//       email: "admin@example.com",
//       password: "securepassword123", // Make sure to hash passwords in a real application
//       role: "ADMIN",
//     },
//     {
//       email: "teacher1@example.com",
//       password: "securepassword123",
//       role: "TEACHER",
//     },
//     {
//       email: "teacher2@example.com",
//       password: "securepassword123",
//       role: "TEACHER",
//     },
//   ];

//   for (const user of users) {
//     await prisma.user.upsert({
//       where: { email: user.email },
//       update: {},
//       create: user,
//     });
//   }

  console.log("Users have been seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
