import React, { useState } from 'react';
import { QuizCard } from '../quiz/QuizCard';
import { ArrowLeft } from 'lucide-react';

const mockQuizzes = [
  {
    id: '1',
    title: 'Study Habits Assessment',
    description: 'Evaluate your current study techniques and time management skills',
    category: 'study-habits',
    questions: [
      { id: '1', text: 'How often do you create study schedules?', type: 'multiple-choice', options: ['Daily', 'Weekly', 'Monthly', 'Never'] },
      { id: '2', text: 'Rate your focus during study sessions', type: 'rating', rating: { min: 1, max: 10 } },
      { id: '3', text: 'Do you take regular breaks while studying?', type: 'yes-no' },
    ],
  },
  {
    id: '2',
    title: 'Confidence Level Check',
    description: 'Assess your self-confidence in academic and personal situations',
    category: 'confidence',
    questions: [
      { id: '1', text: 'How confident are you in presenting to groups?', type: 'rating', rating: { min: 1, max: 10 } },
      { id: '2', text: 'Do you feel comfortable asking questions in class?', type: 'yes-no' },
      { id: '3', text: 'How do you handle academic challenges?', type: 'multiple-choice', options: ['Very well', 'Well', 'Okay', 'Not well'] },
    ],
    completedAt: new Date(),
    score: 78,
  },
  {
    id: '3',
    title: 'Emotional Wellbeing Survey',
    description: 'Check in with your emotional health and stress levels',
    category: 'emotional-wellbeing',
    questions: [
      { id: '1', text: 'How often do you feel stressed about academics?', type: 'multiple-choice', options: ['Daily', 'Weekly', 'Monthly', 'Rarely'] },
      { id: '2', text: 'Rate your overall happiness level', type: 'rating', rating: { min: 1, max: 10 } },
      { id: '3', text: 'Do you have adequate support from friends and family?', type: 'yes-no' },
    ],
  },
  {
    id: '4',
    title: 'Communication Skills Assessment',
    description: 'Evaluate your verbal and written communication abilities',
    category: 'communication',
    questions: [
      { id: '1', text: 'How comfortable are you with public speaking?', type: 'rating', rating: { min: 1, max: 10 } },
      { id: '2', text: 'Do you actively listen during conversations?', type: 'yes-no' },
      { id: '3', text: 'How would you rate your writing skills?', type: 'multiple-choice', options: ['Excellent', 'Good', 'Average', 'Needs improvement'] },
    ],
    completedAt: new Date(),
    score: 85,
  },
];

export const QuizSection = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (selectedQuiz && currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed
      setSelectedQuiz(null);
      setCurrentQuestion(0);
      setAnswers({});
    }
  };

  const handleBack = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setAnswers({});
  };

  if (selectedQuiz) {
    const question = selectedQuiz.questions[currentQuestion];
    const isLastQuestion = currentQuestion === selectedQuiz.questions.length - 1;
    const hasAnswer = answers[question.id] !== undefined;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleBack}
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
                    <label key={index} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name={question.id}
                        value={option}
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
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Self-Evaluation Quizzes</h1>
        <p className="text-gray-600 mt-2">Assess your skills and track your personal development</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockQuizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            onStart={handleStartQuiz}
          />
        ))}
      </div>
    </div>
  );
};
