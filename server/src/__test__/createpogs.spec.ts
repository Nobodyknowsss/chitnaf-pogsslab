import supertest from "supertest";
import { prisma, app } from "../../server";

describe("PUT /api/pogs/update/:id", () => {
  it("should update an existing pog", async () => {
    const createdPog = await prisma.pog.create({
      data: {
        name: "brimstone",
        ticker_symbol: "brim123",
        price: 8000,
        color: "black",
      },
    });

    const updatedPogData = {
      name: "phoenix",
      ticker_symbol: "phoenix123",
      price: 9000,
      color: "red",
    };

    const res = await supertest(app)
      .put(`/api/pogs/update/${createdPog.id}`)
      .send(updatedPogData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(updatedPogData);
  });
});
