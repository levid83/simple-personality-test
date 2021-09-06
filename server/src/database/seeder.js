const Quiz = require("../models/quiz");

module.exports = async function seed() {
  const quiz = new Quiz({
    title: "Personality test",
    slug: "personality-test",
    description: `You probably have a hunch about which one you are, but why not take this quiz and double-check? Knowing your traits will help you
     figure out how you can best fit and function in the workplace and the world.`,
    questions: [
      {
        title: "You usually get more joy out of:",
        answers: [
          { text: "Waitching a great movie", points: 10 },
          { text: "Reading a great book", points: 1 },
        ],
      },
      {
        title: "You feel more yourself when you’re:         ",
        answers: [
          { text: "In the background", points: 1 },
          { text: "The cente of attention", points: 10 },
        ],
      },
      {
        title: "You would hate working with someone who’s:",
        answers: [
          { text: "Timid and meek", points: 1 },
          { text: "Brash and overbearing", points: 10 },
        ],
      },
      {
        title: "In your free time on the weekend, you'd prefer:",
        answers: [
          {
            text: "Mingling at party filled with people you've never met before",
            points: 10,
          },
          {
            text: "Sharing a deep conversation with a good friend",
            points: 1,
          },
        ],
      },
      {
        title: "You’re more likely to recharge your batteries by:",
        answers: [
          { text: "Getting some alone time", points: 1 },
          { text: "Going out with a group of friends", points: 10 },
        ],
      },
      {
        title: "In general, which of the two are you more likely to feel?",
        answers: [
          { text: "Overwhelmed and overstimulated", points: 10 },
          { text: "Bored and understimulated", points: 1 },
        ],
      },
      {
        title:
          "The people who know you best are more likely to describe you as someone who’s:",
        answers: [
          { text: "Quiet and reflective", points: 1 },
          { text: "Outgoing and talkative", points: 10 },
        ],
      },
      {
        title: "You tend to find talking to new people:",
        answers: [
          { text: "Awkward", points: 1 },
          { text: "Energizing", points: 10 },
        ],
      },
      {
        title: "When you meet someone for the first time:",
        answers: [
          { text: "You usually do most of the listening", points: 1 },
          { text: "you usually do most of the talking", points: 10 },
        ],
      },
      {
        title: "You’re more productive when you’re:",
        answers: [
          { text: "In a cafe", points: 10 },
          { text: "In a quiet room", points: 1 },
        ],
      },
    ],
    scores: [
      {
        level: "introvert",
        text: `Your results indicate that you are more of an introvert.<br><br>

        What exactly does this mean?<br><br>
        
        Introverts tend to enjoy solitude and spending quiet time alone. 
        They expend energy in social situations and prefer not to be the center of attention.<br><br>

        In general, people might describe you as quiet. You probably prefer to spend time alone 
        or with a small group of close friends and family. You may dislike busy social events 
        such as parties and often feel drained after spending a lot of time around people you do not know well.<br><br>

        In addition to understanding the main characteristics of introverts, it can be helpful 
        to understand more about dating an introvert and how to distinguish between introversion and shyness.`,
        minPoints: 0,
        maxPoints: 35,
      },
      {
        level: "ambivert",
        text: `Most people lie somewhere in between the two polar ends of each personality dimension. 
          Your results indicate that you have both extrovert and introvert qualities. 
          What exactly does this mean?<br><br>

          Extroverts tend to be quite outgoing and talkative. They enjoy spending time with other people, 
          and feel energized in social situations. Oftentimes, extroverts like being the focus of attention.<br><br>
          
          Introverts tend to enjoy solitude and spending quiet time alone. They expend energy in social situations, 
          and prefer not to be the center of attention.<br><br>

          Since your results indicate that you are somewhere in the middle of the extrovert/introvert continuum, 
          you tend to have qualities that fit into both ends of the spectrum. You like spending time with others, 
          but you also enjoy having time to yourself. You might not mind being the center of attention once in a while, 
          but you probably prefer to stay out of the spotlight on a day-to-day basis.`,
        minPoints: 36,
        maxPoints: 66,
      },
      {
        level: "extrovert",
        text: `Your results indicate that you are more of an extrovert. What exactly does this mean?<br><br>

          Extroverts tend to be quite outgoing and talkative. They enjoy spending time with other people, 
          and feel energized in social situations. Oftentimes, extroverts like being the focus of attention.<br><br>

          As an extrovert, people probably describe you as friendly and outgoing. 
          You love meeting new people and have no problem making new friends. 
          Spending time with others leaves you feeling energized and inspired.`,
        minPoints: 67,
        maxPoints: 100,
      },
    ],
  });
  await quiz.save();
};
