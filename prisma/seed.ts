import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      password: '1234',
    },
  });

  const board = await prisma.board.create({
    data: {
      title: 'title',
    },
  });

  const userBoard = await prisma.userBoard.create({
    data: {
      userId: user.id,
      boardId: board.id,
    },
  });

  await prisma.record.createMany({
    data: [
      {
        userBoardId: userBoard.id,
        description: 'title',
        amount: 100,
        type: 'EXPENSE',
      },
      {
        userBoardId: userBoard.id,
        description: 'title',
        amount: 100,
        type: 'INCOME',
      },
    ],
  });
}

seed()
  .then(() => {
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
