/* eslint-disable import/extensions */
import { hash } from 'bcrypt';
import prismaClient from './index.js';

const prisma = prismaClient;

(async () => {
  await prisma.movie.createMany({
    data: [
      {
        name: 'Interstelar',
        description: 'SCI-FI',
        duration: 180,
        classification: 'RESTRICTED',
      },
      {
        name: 'Batman Begins',
        description: 'Batman...',
        duration: 180,
        classification: 'RESTRICTED',
      },
      {
        name: 'Batman Dark Knight',
        description: 'Batman...',
        duration: 180,
        classification: 'RESTRICTED',
      },
    ],
  });

  const movie = await prisma.movie.findFirst();

  await prisma.session.create({
    data: {
      sessionDate: new Date(),
      room: 'IMAX',
      movie: {
        connect: { id: movie.id },
      },
      price: 3000,
    },
  });

  const session = await prisma.session.findFirst();

  await prisma.sessionSeats.create({
    data: {
      name: 'A1',
      line: 'A',
      column: 1,
      state: true,
      sessionId: session.id,
    },
  });

  const sessionSeat = await prisma.sessionSeats.findFirst();

  await prisma.user.create({
    data: {
      name: 'Iury',
      email: 'iury.tavares@example.com',
      password: await hash('123456', 10),
      birthDate: new Date('1996-07-02'),
      role: 'ADMINISTRATOR',
    },
  });

  const user = await prisma.user.findFirst();

  await prisma.ticket.create({
    data: {
      sessionId: session.id,
      userId: user.id,
      sessionSeatsId: sessionSeat.id,
    },
  });
})();
