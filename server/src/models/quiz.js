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
  level: { type: String, required: true },
  text: { type: String, required: true },
  minPoints: Number,
  maxPoints: Number,
});

const quiz = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[^\s-_](?!.*?[-_]{2,})[a-z0-9-\\][^\s]*[^-_\s]$/,
        "Please give a valid slug",
      ],
    },
    title: { type: String, required: true },
    description: String,
    questions: {
      type: [question],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    scores: {
      type: [score],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

module.exports = model("Quiz", quiz);
