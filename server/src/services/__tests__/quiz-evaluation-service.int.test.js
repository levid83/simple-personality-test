const { evaluateQuiz } = require("../QuizEvaluationService");

const { testQuiz } = require("../../test/testData");
const Quiz = require("../../models/quiz");

describe("Quize Evaluation Service test", () => {
  it("can calulate the score based on answers", async () => {
    const quiz = new Quiz(testQuiz);
    await quiz.save();

    const answers = quiz.questions.reduce(
      (a, q) => [...a, ...q.answers.map((item) => item.id)],
      []
    );
    const totalPoints = quiz.questions.reduce(
      (points, q) =>
        points + q.answers.reduce((sum, item) => sum + item.points, 0),
      0
    );

    const { score, points } = await evaluateQuiz(quiz.id, answers);
    expect(points).toBe(totalPoints);

    expect(score.level).toBe(quiz.scores[2].level);
  });

  it("throws an error in case of incorrect scores", async () => {
    expect.assertions(1);

    const quiz = new Quiz(testQuiz);
    quiz.scores[2].maxPoints = 0;
    await quiz.save();

    const answers = quiz.questions.reduce(
      (a, q) => [...a, ...q.answers.map((item) => item.id)],
      []
    );
    try {
      const { score } = await evaluateQuiz(quiz.id, answers);
    } catch (err) {
      expect(err).toBeTruthy();
    }
  });

  it("throws an error in case of incorrect quiz id", async () => {
    expect.assertions(1);

    const quiz = new Quiz(testQuiz);
    quiz.scores[2].maxPoints = 0;
    await quiz.save();

    const answers = quiz.questions.reduce(
      (a, q) => [...a, ...q.answers.map((item) => item.id)],
      []
    );
    try {
      const { score } = await evaluateQuiz("invalid", answers);
    } catch (err) {
      expect(err).toBeTruthy();
    }
  });
});
