/*
  Warnings:

  - You are about to drop the column `hone` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hone",
ADD COLUMN     "phone" TEXT;
