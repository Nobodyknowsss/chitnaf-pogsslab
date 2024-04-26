import supertest from "supertest";
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use("/api", router);

describe("POST /api/buy", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Clear any existing data from relevant tables before each test
    await prisma.pog.deleteMany();
    await prisma.wallet.deleteMany();
    await prisma.owned.deleteMany();
  });

  describe("when missing required fields", () => {
    it("should return 400", async () => {
      const res = await supertest(app).post("/api/pogs/buy").send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("when pog is not found", () => {
    it("should return 404", async () => {
      const res = await supertest(app)
        .post("/api/buy")
        .send({ user_id: 1, pogs_id: 1, stock: 10 });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("when there are insufficient funds", () => {
    it("should return 400", async () => {
      const res = await supertest(app)
        .post("/api/buy")
        .send({ user_id: 1, pogs_id: 1, stock: 10 });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("when purchasing pogs successfully", () => {
    it("should return 200", async () => {
      const res = await supertest(app)
        .post("/api/buy")
        .send({ user_id: 1, pogs_id: 1, stock: 10 });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Pogs purchased successfully");
    });
  });
});
