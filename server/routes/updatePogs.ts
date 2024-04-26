// routes/updatePog.ts
import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.put("/update/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, ticker_symbol, price, color } = req.body;
    const updatedPog = await prisma.pog.update({
      where: { id: parseInt(id) },
      data: {
        name,
        ticker_symbol,
        price,
        color,
      },
    });
    res.status(200).json(updatedPog);
  } catch (error) {
    console.error("Error updating pog:", error);
    res.status(500).json({ error: "Failed to update pog" });
  }
});

export default router;
