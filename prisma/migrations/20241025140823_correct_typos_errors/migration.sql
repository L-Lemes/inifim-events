/*
  Warnings:

  - You are about to drop the column `managedById` on the `Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[managerId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `managerId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_managedById_fkey";

-- DropIndex
DROP INDEX "Event_managedById_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "managedById",
ADD COLUMN     "managerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Event_managerId_key" ON "Event"("managerId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
