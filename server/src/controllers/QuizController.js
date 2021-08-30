function getQuiz(req, res) {
  res.status(200).json({ result: "questions" });
}

function sendAnswers(req, res) {
  res.status(201).json({ result: "success" });
}

module.exports = { getQuiz, sendAnswers };
