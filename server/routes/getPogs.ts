import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/get", async (req: Request, res: Response) => {
  try {
    const pogs = await prisma.pog.findMany();
    res.status(200).json(pogs);
  } catch (error) {
    console.error("Error fetching pogs:", error);
    res.status(500).json({ error: "Failed to fetch pogs" });
  }
});

export default router;
