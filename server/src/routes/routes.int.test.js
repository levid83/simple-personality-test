describe("API routes test", () => {
  it("returns 404 on wrong endpoint", async () => {
    const response = await request.get("/xyz");
    expect(response.statusCode).toBe(404);
  });
  it("has quiz endpoint", async () => {
    const response = await request.options("/quiz/");
    expect(response.statusCode).toBe(204);
  });

  it("has quiz result endpoint", async () => {
    const response = await request.options("/quiz-result/");
    expect(response.statusCode).toBe(204);
  });

  it("shouldn't accept wrong url parameter", async () => {
    const response1 = await request.get("/quiz/$$$WRWER#$#$$");
    expect(response1.statusCode).toBe(404);

    const response2 = await request.post("/quiz-result/!2#$$@!");
    expect(response2.statusCode).toBe(404);
  });
});
