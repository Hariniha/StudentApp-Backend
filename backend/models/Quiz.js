
// models/Quiz.js
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  id: String,
  text: String,
  type: String,
  options: [String],
  rating: {
    min: Number,
    max: Number,
  },
});

const QuizSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  questions: [QuestionSchema],
  completedAt: Date,
  score: Number,
});

module.exports = mongoose.model('Quiz', QuizSchema);
