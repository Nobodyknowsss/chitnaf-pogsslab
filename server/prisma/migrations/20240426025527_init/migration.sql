-- CreateTable
CREATE TABLE "Pog" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ticker_symbol" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Pog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pog_name_key" ON "Pog"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pog_ticker_symbol_key" ON "Pog"("ticker_symbol");
