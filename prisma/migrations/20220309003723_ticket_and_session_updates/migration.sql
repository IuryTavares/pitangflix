/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMINISTRATOR', 'USER');

-- CreateEnum
CREATE TYPE "TicketCategory" AS ENUM ('FREE', 'HALF_PRICE', 'PROMO', 'STANDARD');

-- CreateEnum
CREATE TYPE "SeatType" AS ENUM ('DOUBLESEAT', 'STANDARD', 'WHEELCHAIR');

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "sessionDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "reviewer" BOOLEAN DEFAULT false,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT E'USER',
ALTER COLUMN "birthDate" DROP NOT NULL;

-- CreateTable
CREATE TABLE "SessionSeats" (
    "id" TEXT NOT NULL,
    "line" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "column" INTEGER NOT NULL,
    "type" "SeatType" NOT NULL DEFAULT E'STANDARD',
    "state" BOOLEAN NOT NULL DEFAULT false,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "sessionId" TEXT,

    CONSTRAINT "SessionSeats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "category" "TicketCategory" NOT NULL DEFAULT E'STANDARD',
    "paymentStatus" BOOLEAN NOT NULL DEFAULT false,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionSeatsId" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SessionSeats" ADD CONSTRAINT "SessionSeats_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_sessionSeatsId_fkey" FOREIGN KEY ("sessionSeatsId") REFERENCES "SessionSeats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
