const { getQuiz, sendAnswers } = require("../controllers/QuizController");

module.exports = (app) => {
  app.get("/quiz/:slug", getQuiz);
  app.post("/answers", sendAnswers);
};
