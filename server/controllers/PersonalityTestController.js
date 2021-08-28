exports.getPersonalityTest = (req, res) => {
  res.status(200).json({ result: "questions" });
};

exports.sendAnswers = (req, res) => {
  res.status(201).json({ result: "success" });
};
