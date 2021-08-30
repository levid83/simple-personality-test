const { Schema, model } = require("mongoose");

const answer = new Schema({
  text: { type: String, required: true },
  points: { type: Number, required: true },
});

const question = new Schema({
  title: { type: String, required: true },
  answers: {
    type: [answer],
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
});

const score = new Schema({
  type: { type: String, required: true },
  text: { type: String, required: true },
  minPoints: Number,
  maxPoints: Number,
});

const quiz = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Please give a valid slug"],
  },
  title: { type: String, required: true },
  description: String,
  questions: {
    type: [question],
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
  scores: { type: [score], validate: (v) => Array.isArray(v) && v.length > 0 },
});

module.exports = model("Quiz", quiz);
