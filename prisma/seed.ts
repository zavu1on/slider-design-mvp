import { hashPassword } from '@/entities/auth/lib/password';
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      login: 'admin',
      password: await hashPassword('admin'),
    },
  });

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error('Seed generating failed:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
