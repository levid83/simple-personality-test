const { Schema, model } = require("mongoose");
const Quiz = require("../../models/quiz");

const testQuiz = {
  title: "Personality Test",
  slug: "personality-test",
  questions: [
    {
      title: "1. Question?",
      answers: [
        { text: "answer 1.1", points: 10 },
        { text: "answer 1.2", points: 20 },
        { text: "answer 1.3", points: 5 },
      ],
    },
  ],
  scores: [
    {
      type: "introvert",
      text: "text for introvert",
      minPoints: 0,
      maxPoints: 40,
    },
    {
      type: "ambivert",
      text: "text for ambivert",
      minPoints: 41,
      maxPoints: 60,
    },
    {
      type: "extrovert",
      text: "text for extrovet",
      minPoints: 61,
      maxPoints: 100,
    },
  ],
};

describe("Quiz test", () => {
  it("can save quiz into database", async () => {
    const quiz = new Quiz(testQuiz);
    const result = await quiz.save();
    expect(result).toMatchObject(testQuiz);
  });

  it("should have valid slug", async () => {
    expect.assertions(1);
    const quiz = new Quiz({ ...testQuiz, slug: "person@;test" });
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
