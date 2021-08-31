const Quiz = require("../../models/quiz");
const { testQuiz } = require("../../test/testData.js");

describe("Quiz Controller test", () => {
  it("returns 404 when quiz has not been found", async () => {
    const response = await request
      .get("/quiz/unknown-test")
      .expect("Content-Type", /json/);

    expect(response.statusCode).toBe(404);
  });
  it("returns 200 and the quiz data", async () => {
    const quiz = new Quiz(testQuiz);
    const result = await quiz.save();

    const response = await request
      .get("/quiz/personality-test")
      .expect("Content-Type", /json/);

    expect(response.statusCode).toBe(200);

    expect(response.body.data).toBeTruthy();
  });
});
