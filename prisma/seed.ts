import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      login: 'admin',
      password: 'hashed-password', // todo change to bcrypt
    },
  });

  await prisma.slide.createMany({
    data: [
      {
        name: 'Welcome Presentation',
        data: '{"slides":[{"title":"Welcome"}]}',
        authorId: user.id,
      },
      {
        name: 'Project Overview',
        data: '{"slides":[{"title":"Project Goals"}]}',
        authorId: user.id,
      },
    ],
  });

  console.log('Database has been seeded. 🌱');
}

main()
  .catch(e => {
    console.error('Seed generating failed:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
