/*
  Warnings:

  - You are about to drop the column `reset_token` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reset_password_token]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_reset_token_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "reset_token",
ADD COLUMN     "reset_password_token" TEXT,
ADD COLUMN     "reset_password_token_expires_at" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "users_reset_password_token_key" ON "users"("reset_password_token");
