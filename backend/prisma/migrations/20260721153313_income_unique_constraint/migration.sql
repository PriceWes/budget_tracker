/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Income` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Income_id_userId_key" ON "Income"("id", "userId");
