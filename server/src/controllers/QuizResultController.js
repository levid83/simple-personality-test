const { validationResult } = require("express-validator");
const { evaluateQuiz } = require("../services/QuizEvaluationService");

async function evaluateAnswers(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ error: errors.array()[0].msg });

  try {
    const { score, points } = await evaluateQuiz(
      req.params.id,
      req.body.answers
    );

    return res.status(201).json({ data: { score, points } });
  } catch (err) {
    return res.status(404).json({ error: "Cannot evaluate the quiz result" });
  }
}

module.exports = { evaluateAnswers };
