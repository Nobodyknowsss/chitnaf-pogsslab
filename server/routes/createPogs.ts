// routes/createPog.ts
import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/create", async (req: Request, res: Response) => {
  try {
    const { name, ticker_symbol, price, color } = req.body;
    const createdPog = await prisma.pog.create({
      data: {
        name,
        ticker_symbol,
        price,
        color,
      },
    });
    res.status(201).json(createdPog);
  } catch (error) {
    console.error("Error creating pog:", error);
    res.status(500).json({ error: "Failed to create pog" });
  }
});

export default router;
