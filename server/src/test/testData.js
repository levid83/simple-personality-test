module.exports = {
  testQuiz: {
    title: "Personality Test",
    slug: "personality-test",
    questions: [
      {
        title: "1. Question?",
        answers: [
          { text: "answer 1.1", points: 10 },
          { text: "answer 1.2", points: 20 },
          { text: "answer 1.3", points: 5 },
        ],
      },
      {
        title: "2. Question?",
        answers: [
          { text: "answer 2.1", points: 30 },
          { text: "answer 2.2", points: 15 },
          { text: "answer 2.3", points: 10 },
        ],
      },
    ],
    scores: [
      {
        level: "introvert",
        text: "text for introvert",
        minPoints: 0,
        maxPoints: 40,
      },
      {
        level: "ambivert",
        text: "text for ambivert",
        minPoints: 41,
        maxPoints: 60,
      },
      {
        level: "extrovert",
        text: "text for extrovet",
        minPoints: 61,
        maxPoints: 100,
      },
    ],
  },
};
