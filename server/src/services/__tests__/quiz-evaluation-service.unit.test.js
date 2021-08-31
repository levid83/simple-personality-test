const { calculatePoints, getScore } = require("../QuizEvaluationService");

describe("Quize Evaluation Service test", () => {
  it("throws an error when no answers are provided", () => {
    const quiz = {
      questions: [
        {
          answers: [
            { id: 1, points: 10 },
            { id: 2, points: 20 },
          ],
        },
        {
          answers: [
            { id: 3, points: 30 },
            { id: 4, points: 40 },
          ],
        },
      ],
    };
    expect(() => {
      calculatePoints(quiz, null);
    }).toThrow();

    const answers = [];
    expect(() => {
      calculatePoints(quiz, []);
    }).toThrow();
  });

  it("can calulate the score based on answers", () => {
    const quiz = {
      questions: [
        {
          answers: [
            { id: 1, points: 10 },
            { id: 2, points: 20 },
          ],
        },
        {
          answers: [
            { id: 3, points: 30 },
            { id: 4, points: 40 },
          ],
        },
      ],
    };
    const answers = [1, 3];
    expect(calculatePoints(quiz, answers)).toBe(40);
  });

  it("throws an error when no score is provided ", () => {
    expect(() => {
      getScore(null, 15);
    }).toThrow();
    expect(() => {
      getScore([], 15);
    }).toThrow();
  });

  it("throws an error when out of range point is provided", () => {
    const scores = [
      { minPoints: 1, maxPoints: 10 },
      { minPoints: 11, maxPoints: 20 },
      { minPoints: 21, maxPoints: 30 },
    ];
    expect(() => {
      getScore(scores, 50);
    }).toThrow();
  });

  it("calculates the score based on the scores table", () => {
    const scores = [
      { level: "bad", minPoints: 1, maxPoints: 10 },
      { level: "acceptable", minPoints: 11, maxPoints: 20 },
      { level: "excellent", minPoints: 21, maxPoints: 30 },
    ];
    expect(getScore(scores, 8).level).toBe("bad");
    expect(getScore(scores, 20).level).toBe("acceptable");
    expect(getScore(scores, 21).level).toBe("excellent");
  });
});
