const { getQuiz } = require("../controllers/QuizController");
const { evaluateAnswers } = require("../controllers/QuizResultController");
const { param, header, body } = require("express-validator");

module.exports = (app) => {
  app.get(
    "/quiz/:slug",
    param("slug", "Invalid url parameter").isSlug(),
    getQuiz
  );
  app.post(
    "/quiz-result/:id",
    header("content-type", "Request mime type must be JSON").isMimeType("json"),
    param("id", "Invalid url parameter").isAlphanumeric(),
    body("answers", "Answers must be an array").isArray({ min: 1 }),
    evaluateAnswers
  );
};
