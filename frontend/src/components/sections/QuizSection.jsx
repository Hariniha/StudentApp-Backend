import React, { useState, useEffect } from 'react';
import { QuizCard } from '../quiz/QuizCard';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';

export const QuizSection = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // Fetch quizzes on mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/quizzes')
      .then(res => setQuizzes(res.data))
      .catch(err => console.error(err));
  }, []);

  // Start selected quiz
  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setScore(0);
  };

  // Record user's answer for a question
  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  // Move to next question or show result if last question
  const handleNext = () => {
    if (!selectedQuiz) return;

    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score when quiz completes
      let correctCount = 0;
      selectedQuiz.questions.forEach(q => {
        if (answers[q.id] === q.correctAnswer) {
          correctCount++;
        }
      });
      setScore((correctCount / selectedQuiz.questions.length) * 100);
      setShowResult(true);
    }
  };

  // Go back to quiz list (and reset all state)
  const handleBackToList = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setScore(0);
  };

  // Retry quiz
  const handleRetry = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setScore(0);
  };

  // Show quiz list
  if (!selectedQuiz) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Self-Evaluation Quizzes</h1>
          <p className="text-gray-600 mt-2">Assess your skills and track your personal development</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map(quiz => (
            <QuizCard
              key={quiz.title}
              quiz={{ ...quiz, score: quiz.score ?? null }} // pass score if you want
              onStart={handleStartQuiz}
            />
          ))}
        </div>
      </div>
    );
  }

  // Show result screen after quiz completion
  if (showResult) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow">
        <button
          onClick={handleBackToList}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Quizzes</span>
        </button>

        <h2 className="text-2xl font-bold mb-4">{selectedQuiz.title} - Results</h2>
        <p className="text-lg font-semibold mb-6">Your score: {score.toFixed(2)}%</p>

        <h3 className="text-xl font-semibold mb-3">Review your answers:</h3>
        <ul className="space-y-4">
          {selectedQuiz.questions.map(q => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            return (
              <li
                key={q.id}
                className={`p-4 border rounded ${isCorrect ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'}`}
              >
                <p className="font-medium">{q.text}</p>
                <p>Your answer: <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>{userAnswer ?? 'No answer'}</span></p>
                {!isCorrect && <p>Correct answer: <span className="font-semibold">{q.correctAnswer}</span></p>}
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex space-x-4">
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry Quiz
          </button>
          <button
            onClick={handleBackToList}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Back to Quiz List
          </button>
        </div>
      </div>
    );
  }

  // Quiz in progress UI
  const question = selectedQuiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === selectedQuiz.questions.length - 1;
  const hasAnswer = answers[question.id] !== undefined;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBackToList}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Quizzes</span>
          </button>
          <div className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {selectedQuiz.questions.length}
          </div>
        </div>

        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / selectedQuiz.questions.length) * 100}%` }}
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedQuiz.title}</h2>
          <h3 className="text-lg font-medium text-gray-800 mb-6">{question.text}</h3>

          <div className="space-y-3">
            {question.type === 'multiple-choice' && question.options && (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => handleAnswer(question.id, option)}
                      className="text-blue-600"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}

            {question.type === 'rating' && question.rating && (
              <div className="flex space-x-2">
                {Array.from({ length: question.rating.max - question.rating.min + 1 }, (_, i) => {
                  const value = question.rating.min + i;
                  return (
                    <button
                      key={value}
                      onClick={() => handleAnswer(question.id, value)}
                      className={`w-12 h-12 rounded-full border-2 transition-colors ${
                        answers[question.id] === value
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            )}

            {question.type === 'yes-no' && (
              <div className="flex space-x-4">
                {['Yes', 'No'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(question.id, option)}
                    className={`px-8 py-3 rounded-lg border-2 transition-colors ${
                      answers[question.id] === option
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!hasAnswer}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLastQuestion ? 'Complete Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};
