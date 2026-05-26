/*
  Warnings:

  - You are about to alter the column `address` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `complement` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[reset_token]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "reset_token" TEXT,
ALTER COLUMN "address" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "cep" SET DATA TYPE CHAR(8),
ALTER COLUMN "complement" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "state" SET DATA TYPE CHAR(2);

-- CreateIndex
CREATE UNIQUE INDEX "users_reset_token_key" ON "users"("reset_token");
