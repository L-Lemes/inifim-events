-- CreateTable
CREATE TABLE "BancoFDC" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BancoFDC_name_key" ON "BancoFDC"("name");
