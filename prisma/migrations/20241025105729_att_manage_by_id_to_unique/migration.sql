/*
  Warnings:

  - A unique constraint covering the columns `[managedById]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Event_managedById_key" ON "Event"("managedById");
