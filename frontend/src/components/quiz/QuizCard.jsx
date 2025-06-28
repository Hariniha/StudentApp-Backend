import React from 'react';
import { Clock, CheckCircle, Circle } from 'lucide-react';

const categoryColors = {
  'study-habits': 'from-blue-500 to-blue-600',
  'confidence': 'from-purple-500 to-purple-600',
  'emotional-wellbeing': 'from-teal-500 to-teal-600',
  'communication': 'from-green-500 to-green-600',
};

export const QuizCard = ({ quiz, onStart }) => {
  const isCompleted = quiz.completedAt !== undefined;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${categoryColors[quiz.category]}`}>
          {isCompleted ? (
            <CheckCircle className="w-6 h-6 text-white" />
          ) : (
            <Circle className="w-6 h-6 text-white" />
          )}
        </div>
        {isCompleted && quiz.score != null && (
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            quiz.score >= 80 ? 'bg-green-100 text-green-800' :
            quiz.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {quiz.score}%
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{quiz.title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{quiz.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          <span>{quiz.questions.length} questions</span>
        </div>

        <button
          onClick={() => onStart(quiz)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            isCompleted
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : `bg-gradient-to-r ${categoryColors[quiz.category]} text-white hover:shadow-lg transform hover:scale-105`
          }`}
        >
          {isCompleted ? 'Review' : 'Start Quiz'}
        </button>
      </div>
    </div>
  );
};
