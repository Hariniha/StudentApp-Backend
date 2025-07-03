// routes/quizzes.js
const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz'); // adjust path to your model
const fs = require('fs');
const path = require('path');

const quizzesFile = path.join(__dirname, '..', 'data', 'quizzes.json');

// GET all quizzes
router.get('/', (req, res) => {
  try {
    const data = fs.readFileSync(quizzesFile, 'utf-8');
    const quizzes = JSON.parse(data);
    res.json(quizzes);
  } catch (error) {
    console.error('Error reading quizzes:', error);
    res.status(500).json({ message: 'Server error reading quizzes' });
  }
});

// // routes/quizzes.js
// router.post('/', async (req, res) => {
//   try {
//     const newQuiz = new Quiz(req.body);
//     await newQuiz.save();
//     res.status(201).json({ message: 'Quiz saved successfully' });
//   } catch (error) {
//     console.error('Error saving quiz:', error);
//     res.status(500).json({ error: 'Failed to save quiz' });
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     const quizId = req.params.id;
//     const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

//     if (!deletedQuiz) {
//       return res.status(404).json({ message: 'Quiz not found' });
//     }

//     res.json({ message: 'Quiz deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting quiz:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


module.exports = router; // ✅ Don't forget this
