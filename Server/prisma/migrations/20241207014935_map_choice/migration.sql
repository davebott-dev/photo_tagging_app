/*
  Warnings:

  - Added the required column `gameboardId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gameboardId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_gameboardId_fkey" FOREIGN KEY ("gameboardId") REFERENCES "Gameboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
