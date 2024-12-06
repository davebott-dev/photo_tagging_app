/*
  Warnings:

  - You are about to drop the `Char` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Char";

-- CreateTable
CREATE TABLE "Gameboard" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imgURL" TEXT NOT NULL,

    CONSTRAINT "Gameboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "xCoord" DOUBLE PRECISION NOT NULL,
    "yCoord" DOUBLE PRECISION NOT NULL,
    "gameboardId" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guess" (
    "id" TEXT NOT NULL,
    "xCoord" DOUBLE PRECISION NOT NULL,
    "yCoord" DOUBLE PRECISION NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "characterId" TEXT,

    CONSTRAINT "Guess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_gameboardId_fkey" FOREIGN KEY ("gameboardId") REFERENCES "Gameboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guess" ADD CONSTRAINT "Guess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guess" ADD CONSTRAINT "Guess_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE SET NULL ON UPDATE CASCADE;
