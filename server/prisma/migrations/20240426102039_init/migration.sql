-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owned" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "pogs_id" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Owned_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_user_id_key" ON "Wallet"("user_id");
