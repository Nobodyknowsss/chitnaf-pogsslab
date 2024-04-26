import supertest from "supertest";
import { prisma, app } from "../../server";

describe("pogs", () => {
  describe("show all pogs", () => {
    describe("given all of pogs on the database", () => {
      it("should return all champions", async () => {
        try {
          await prisma.pog.create({
            data: {
              name: "teemo",
              ticker_symbol: "231dda",
              price: 32311,
              color: "green",
            },
          });

          const res = await supertest(app).get("/api/pogs/get");

          expect(res.statusCode).toBe(200);
          expect(res.body.length).toBe(1);
        } catch (error) {
          console.error("Error creating pog:", error);
        } finally {
        }
      });
    });
  });
});
