// routes/deletePog.ts
import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.pog.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting pog:", error);
    res.status(500).json({ error: "Failed to delete pog" });
  }
});

export default router;
