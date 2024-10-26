/*
  Warnings:

  - You are about to drop the column `managerId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the `_EventToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('MANAGER', 'GUEST');

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_managerId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_userId_fkey";

-- DropForeignKey
ALTER TABLE "_EventToUser" DROP CONSTRAINT "_EventToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToUser" DROP CONSTRAINT "_EventToUser_B_fkey";

-- DropIndex
DROP INDEX "Event_managerId_key";

-- DropIndex
DROP INDEX "Location_isPublic_name_publicPlace_number_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "managerId";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "userId";

-- DropTable
DROP TABLE "_EventToUser";

-- CreateTable
CREATE TABLE "EventUserRole" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "role" "RoleType" NOT NULL,

    CONSTRAINT "EventUserRole_pkey" PRIMARY KEY ("userId","eventId","role")
);

-- CreateTable
CREATE TABLE "landlord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,

    CONSTRAINT "landlord_pkey" PRIMARY KEY ("userId","locationId")
);

-- AddForeignKey
ALTER TABLE "EventUserRole" ADD CONSTRAINT "EventUserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUserRole" ADD CONSTRAINT "EventUserRole_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landlord" ADD CONSTRAINT "landlord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landlord" ADD CONSTRAINT "landlord_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
