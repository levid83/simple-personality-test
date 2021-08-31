const Quiz = require("../models/quiz");

async function getQuiz(req, res) {
  try {
    const quiz = await Quiz.findOne({ slug: req.params.slug })
      .select("-questions.answers.points")
      .select("-scores");
    res.status(200).json({ data: quiz });
  } catch (err) {
    res.status(401).json({ error: "quiz not found" });
  }
}

module.exports = { getQuiz };
