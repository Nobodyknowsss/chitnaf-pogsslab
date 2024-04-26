import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/add/wallet", async (req: Request, res: Response) => {
  try {
    const { user_id, amount } = req.body;

    if (!user_id || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const walletExistsResult: { exists: boolean }[] =
      await prisma.$queryRawUnsafe(
        `
            SELECT EXISTS(SELECT 1 FROM wallets WHERE user_id = $1) as exists
        `,
        [user_id]
      );

    const walletExists: boolean = walletExistsResult[0].exists;

    if (!walletExists) {
      await prisma.$queryRawUnsafe(
        `
                INSERT INTO wallets (user_id, balance) VALUES ($1, 0)
            `,
        [user_id]
      );
    }

    await prisma.$executeRawUnsafe(
      `
            UPDATE wallets
            SET balance = balance + $1
            WHERE user_id = $2
        `,
      [amount, user_id]
    );

    res.status(200).json({ message: "Funds added successfully" });
  } catch (error) {
    console.error("Error adding funds to wallet:", error);
    res.status(500).json({ error: "Failed to add funds to wallet" });
  }
});

export default router;
