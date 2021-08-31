const Quiz = require("../models/quiz");

async function getQuizBySlug(slug) {
  return Quiz.findOne({ slug: slug })
    .select("-questions.answers.points")
    .select("-scores");
}

module.exports = { getQuizBySlug };
