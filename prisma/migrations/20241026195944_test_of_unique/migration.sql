/*
  Warnings:

  - A unique constraint covering the columns `[publicPlace,number,cep,isPublic]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Location_publicPlace_number_cep_isPublic_key" ON "Location"("publicPlace", "number", "cep", "isPublic");
