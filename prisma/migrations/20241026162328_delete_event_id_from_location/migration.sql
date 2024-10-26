/*
  Warnings:

  - You are about to drop the column `eventId` on the `Location` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Location_eventId_key";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "eventId";
