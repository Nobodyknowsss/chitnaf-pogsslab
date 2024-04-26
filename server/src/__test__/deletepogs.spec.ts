import supertest from "supertest";
import { prisma, app } from "../../server";

describe("DELETE /api/pogs/delete/:id", () => {
  it("should delete an existing pog", async () => {
    const createdPog = await prisma.pog.create({
      data: {
        name: "chitite",
        ticker_symbol: "weweqew",
        price: 9000,
        color: "red",
      },
    });

    const res = await supertest(app).delete(
      `/api/pogs/delete/${createdPog.id}`
    );

    expect(res.statusCode).toBe(204);
  });
});
