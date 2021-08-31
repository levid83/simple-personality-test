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

  it("shouldn't accept wrong Content-Type in header", async () => {
    const response2 = await request.post("/quiz-result/1234");
    expect(response2.statusCode).toBe(400);
  });

  it("shouldn't accept wrong url parameter", async () => {
    const response1 = await request
      .get("/quiz/$$$WRWER#$#$$")
      .expect("Content-Type", /json/);

    expect(response1.statusCode).toBe(400);

    const response2 = await request
      .post("/quiz-result/!2#$$@!")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    expect(response2.statusCode).toBe(400);
  });

  it("shouldn't accept wrong post parameters", async () => {
    const response2 = await request
      .post("/quiz-result/12d3hn1")
      .set("Accept", "application/json")
      .send("incorrect answers format")
      .expect("Content-Type", /json/);

    expect(response2.statusCode).toBe(400);
  });
});
