const Quiz = require("../models/quiz");

function calculatePoints(quiz, answers) {
  if (!Array.isArray(answers) || answers.length === 0)
    throw new Error("Error: no answers provided");
  return quiz.questions.reduce(
    (sum, question) =>
      sum +
      question.answers
        .filter((item) => answers.includes(item.id))
        .reduce((s, item) => s + item.points, 0),
    0
  );
}

function getScore(scores, points) {
  if (!Array.isArray(scores) || scores.length === 0)
    throw new Error("Error: no score provided");
  for (let i = 0; i < scores.length; i++) {
    if (scores[i].minPoints <= points && scores[i].maxPoints >= points)
      return scores[i];
  }
  throw new Error("Error: cannot evaluate the results");
}

async function evaluateQuiz(id, answers) {
  const quiz = await Quiz.findOne({ _id: id });

  const points = calculatePoints(quiz, answers);

  return { score: getScore(quiz.scores, points), points: points };
}

module.exports = { evaluateQuiz, calculatePoints, getScore };
