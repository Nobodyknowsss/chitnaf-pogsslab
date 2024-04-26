import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import getPogs from "./routes/getPogs";
import createPogs from "./routes/createPogs";
import updatePogs from "./routes/updatePogs";
import deletePogs from "./routes/deletePogs";
import addWallet from "./routes/addWallet";
import minusWallet from "./routes/minusWallet";
import walletBalance from "./routes/walletBalance";
import sellPogs from "./routes/sellPogs";
import buyPogs from "./routes/buyPogs";

export const app = express();
const port = 8080;
export const prisma = new PrismaClient();
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});

app.use("/api/pogs", getPogs);
app.use("/api/pogs", createPogs);
app.use("/api/pogs", updatePogs);
app.use("/api/pogs", deletePogs);
app.use("/api/pogs", addWallet);
app.use("/api/pogs", minusWallet);
app.use("/api/pogs", walletBalance);
app.use("/api/pogs", sellPogs);
app.use("/api/pogs", buyPogs);
