import { hashPassword } from '@/entities/auth/lib/password';
import { CanvasElementType, type SlideData } from '@/entities/canvas';
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();
const SLIDE_DATA: SlideData = [
  {
    id: 'slide-1',
    previewUrl:
      'https://www.shutterstock.com/image-vector/preview-text-button-sign-icon-260nw-2251383869.jpg ',
    elements: [
      {
        id: 'image-1',
        type: CanvasElementType.IMAGE,
        content:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSabrBZxuW139T0wCclOEZlj8-uf_pZX2gjw&s',
        x: 20,
        y: 20,
        width: 400,
        height: 300,
      },
      {
        id: 'image-2',
        type: CanvasElementType.IMAGE,
        content:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSabrBZxuW139T0wCclOEZlj8-uf_pZX2gjw&s',
        x: 450,
        y: 20,
        width: 400,
        height: 300,
      },
      {
        id: 'image-3',
        type: CanvasElementType.IMAGE,
        content:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSabrBZxuW139T0wCclOEZlj8-uf_pZX2gjw&s',
        x: 20,
        y: 350,
        width: 400,
        height: 300,
      },
    ],
  },
];

async function main() {
  const user = await prisma.user.create({
    data: {
      login: 'admin',
      password: await hashPassword('admin'),
    },
  });

  await prisma.slide.create({
    data: {
      name: 'Welcome Presentation',
      data: JSON.stringify(SLIDE_DATA),
      authorId: user.id,
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
