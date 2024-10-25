/*
  Warnings:

  - You are about to drop the column `locationId` on the `Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventId` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_locationId_fkey";

-- DropIndex
DROP INDEX "Event_locationId_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "locationId";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "eventId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Location_eventId_key" ON "Location"("eventId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
