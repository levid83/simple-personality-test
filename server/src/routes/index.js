const { getQuiz } = require("../controllers/QuizController");
const { evaluateAnswers } = require("../controllers/QuizResultController");
const { param } = require("express-validator");

module.exports = (app) => {
  app.get(
    "/quiz/:slug",
    param("slug", "Invalid url parameter").isSlug(),
    getQuiz
  );
  app.post(
    "/quiz-result/:id",
    param("id", "Invalid url parameter").isAlphanumeric(),
    evaluateAnswers
  );
};
