const Quiz = require("../../models/quiz");

const { testQuiz } = require("../../test/testData");

describe("Quiz test", () => {
  it("can save quiz into database", async () => {
    const quiz = new Quiz(testQuiz);
    const result = await quiz.save();
    expect(result).toMatchObject(testQuiz);
  });

  it("can read quiz from database", async () => {
    const quiz = new Quiz(testQuiz);
    const result = await quiz.save();

    const quiz2 = await Quiz.findOne(result._id);
    expect(quiz2.id).toStrictEqual(result.id);
  });

  it("should have valid slug", async () => {
    expect.assertions(1);
    const quiz = new Quiz({ ...testQuiz, slug: "$$$person$$$test" });
    try {
      const result = await quiz.save();
    } catch (err) {
      expect(err.message).toMatch("Please give a valid slug");
    }
  });

  it("should have questions", async () => {
    expect.assertions(1);
    const quiz = new Quiz({ ...testQuiz, questions: null });
    try {
      const result = await quiz.save();
    } catch (err) {
      expect(err.message).toMatch("questions");
    }
  });
  it("should have answers", async () => {
    expect.assertions(1);
    const questions = { ...testQuiz.questions, answers: null };
    const quiz = new Quiz({ ...testQuiz, questions });
    try {
      const result = await quiz.save();
    } catch (err) {
      expect(err.message).toMatch("answers");
    }
  });

  it("should have scores", async () => {
    expect.assertions(1);
    const quiz = new Quiz({ ...testQuiz, scores: null });
    try {
      const result = await quiz.save();
    } catch (err) {
      expect(err.message).toMatch("scores");
    }
  });
});
