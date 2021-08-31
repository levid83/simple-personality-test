const Quiz = require("../../models/quiz");
const { testQuiz } = require("../../test/testData.js");

describe("Quiz Result Controller test", () => {
  it("returns 404 when invalid quiz id is posted", async () => {
    const quiz = new Quiz(testQuiz);
    const result = await quiz.save();

    const answers = quiz.questions.reduce(
      (a, q) => [...a, ...q.answers.map((item) => item.id)],
      []
    );

    const response = await request
      .post("/quiz-result/wrongid")
      .set("Accept", "application/json")
      .send({ answers: answers });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBeTruthy();
  });

  it("returns 400 when invalid answer is posted", async () => {
    const quiz = new Quiz(testQuiz);
    const result = await quiz.save();

    const answers = quiz.questions.reduce(
      (a, q) => [...a, ...q.answers.map((item) => item.id)],
      []
    );

    const response = await request
      .post("/quiz-result/" + result.id)
      .set("Accept", "application/json")
      .send("invalid answers");

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  it("returns 201 and the evaluation", async () => {
    const quiz = new Quiz(testQuiz);
    const result = await quiz.save();

    const answers = quiz.questions.reduce(
      (a, q) => [...a, ...q.answers.map((item) => item.id)],
      []
    );

    const response = await request
      .post("/quiz-result/" + result.id)
      .send({ answers: answers })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    expect(response.statusCode).toBe(201);
    expect(response.body.data.points).toBe(90);
    expect(response.body.data.score.level).toBe("extrovert");
  });
});
