const {
  getPersonalityTest,
  sendAnswers,
} = require("../controllers/PersonalityTestController");

module.exports = (app) => {
  app.get("/personality-test/:id", getPersonalityTest);
  app.post("/answers", sendAnswers);
};
