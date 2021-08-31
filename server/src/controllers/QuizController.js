const { validationResult } = require("express-validator");

const { getQuizBySlug } = require("../services/QuizService");

async function getQuiz(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ error: errors.array()[0].msg });

  try {
    const quiz = await getQuizBySlug(req.params.slug);
    if (quiz) return res.status(200).json({ data: quiz });
    else return res.status(404).json({ error: "Quiz not found" });
  } catch (err) {
    return res.status(404).json({ error: "Quiz not found" });
  }
}

module.exports = { getQuiz };
