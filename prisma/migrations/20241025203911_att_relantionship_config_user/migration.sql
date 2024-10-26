/*
  Warnings:

  - You are about to drop the column `userId` on the `Configuration` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[configurationId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `configurationId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Configuration" DROP CONSTRAINT "Configuration_userId_fkey";

-- DropIndex
DROP INDEX "Configuration_userId_key";

-- AlterTable
ALTER TABLE "Configuration" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "configurationId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_configurationId_key" ON "User"("configurationId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "Configuration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
