/*
  Warnings:

  - You are about to drop the column `pfp` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "pfp",
ADD COLUMN     "image" TEXT;
