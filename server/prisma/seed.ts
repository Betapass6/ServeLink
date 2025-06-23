import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);
  const buyer = await prisma.user.upsert({
    where: { email: 'buyer@demo.com' },
    update: {},
    create: {
      name: 'Demo Buyer',
      email: 'buyer@demo.com',
      password,
      role: Role.BUYER,
    },
  });
  const seller = await prisma.user.upsert({
    where: { email: 'seller@demo.com' },
    update: {},
    create: {
      name: 'Demo Seller',
      email: 'seller@demo.com',
      password,
      role: Role.SELLER,
      services: {
        create: [{
          title: 'Jasa Desain Logo',
          description: 'Desain logo profesional untuk bisnis Anda.',
          price: 250000,
          category: 'Desain',
          imageUrl: 'https://via.placeholder.com/300x200',
        }],
      },
    },
  });
  console.log({ buyer, seller });
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect()); 