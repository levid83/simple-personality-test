const { getQuizBySlug } = require("../QuizService");

const { testQuiz } = require("../../test/testData");
const Quiz = require("../../models/quiz");

describe("Quize Service test", () => {
  it("shouldn't return score and points", async () => {
    const q = new Quiz(testQuiz);
    await q.save();

    const quiz = await getQuizBySlug(q.slug);

    expect(quiz.score).toBeFalsy();
    expect(quiz.questions[0].answers[0].points).toBeFalsy();
  });

  it("should get null on invalid id", async () => {
    const res = await getQuizBySlug("invalidslug");
    expect(res).toBe(null);
  });
});
