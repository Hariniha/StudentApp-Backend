import React, { useState } from 'react';
import { MessageSquare, Mic, Play, BookOpen, Award, Volume2 } from 'lucide-react';

const communicationModules = [
  {
    id: '1',
    title: 'Public Speaking Basics',
    description: 'Learn the fundamentals of confident public speaking',
    type: 'video',
    duration: '12 min',
    completed: true,
    thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '2',
    title: 'Body Language & Gestures',
    description: 'Master non-verbal communication techniques',
    type: 'interactive',
    duration: '8 min',
    completed: false,
    thumbnail: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '3',
    title: 'Voice Modulation Practice',
    description: 'Improve your vocal delivery and tone',
    type: 'practice',
    duration: '15 min',
    completed: false,
    thumbnail: 'https://images.pexels.com/photos/3760611/pexels-photo-3760611.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

const practiceExercises = [
  {
    id: '1',
    title: 'Introduction Speech',
    prompt: 'Introduce yourself in 60 seconds, covering your background, interests, and goals.',
    difficulty: 'Beginner',
    timeLimit: 60,
  },
  {
    id: '2',
    title: 'Impromptu Topic',
    prompt: 'Speak about your favorite hobby and why you enjoy it.',
    difficulty: 'Intermediate',
    timeLimit: 120,
  },
  {
    id: '3',
    title: 'Persuasive Argument',
    prompt: 'Convince your audience about the importance of environmental conservation.',
    difficulty: 'Advanced',
    timeLimit: 180,
  },
];

export const CommunicationSection = () => {
  const [activeTab, setActiveTab] = useState('lessons'); // Removed <'lessons' | 'practice' | 'assessment'> type
  const [isRecording, setIsRecording] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null); // Removed number | null type

  const startRecording = () => {
    setIsRecording(true);
    setTimeout(() => setIsRecording(false), 3000); // Simulate recording
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Communication Improvement</h1>
        <p className="text-gray-600 mt-2">Enhance your speaking and presentation skills</p>
      </div>

      <div className="flex bg-gray-100 rounded-lg p-1">
        {[
          { key: 'lessons', label: 'Video Lessons', icon: BookOpen },
          { key: 'practice', label: 'Speech Practice', icon: Mic },
          { key: 'assessment', label: 'Skills Assessment', icon: Award },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)} // removed "as any"
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-colors ${
              activeTab === key
                ? 'bg-white shadow-sm text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'lessons' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communicationModules.map((module) => (
            <div key={module.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={module.thumbnail}
                  alt={module.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Play className="w-12 h-12 text-white" />
                </div>
                {module.completed && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full">
                    <Award className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {module.type}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{module.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{module.duration}</span>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      module.completed
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {module.completed ? 'Review' : 'Start'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'practice' && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Speech Practice</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {practiceExercises.map((exercise, index) => (
                <button
                  key={exercise.id}
                  onClick={() => setSelectedExercise(index)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedExercise === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-medium text-gray-900 mb-2">{exercise.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{exercise.prompt}</p>
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        exercise.difficulty === 'Beginner'
                          ? 'bg-green-100 text-green-800'
                          : exercise.difficulty === 'Intermediate'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {exercise.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">{exercise.timeLimit}s</span>
                  </div>
                </button>
              ))}
            </div>

            {selectedExercise !== null && (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {practiceExercises[selectedExercise].title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {practiceExercises[selectedExercise].prompt}
                  </p>
                  <div className="text-sm text-gray-600">
                    Time limit: {practiceExercises[selectedExercise].timeLimit} seconds
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                      isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    <button onClick={startRecording} disabled={isRecording} className="text-white">
                      {isRecording ? <Volume2 className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                    </button>
                  </div>

                  <p className="text-sm text-gray-600">
                    {isRecording ? 'Recording... Speak clearly!' : 'Click to start recording'}
                  </p>

                  {isRecording && (
                    <div className="w-full max-w-md bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full animate-pulse w-1/3"></div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'assessment' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Communication Skills Assessment</h2>

            <div className="space-y-6">
              {[
                { skill: 'Clarity of Speech', score: 85, feedback: 'Your speech is generally clear with good articulation.' },
                { skill: 'Confidence Level', score: 78, feedback: 'Shows good confidence but can be improved with practice.' },
                { skill: 'Eye Contact', score: 72, feedback: 'Maintain more consistent eye contact with audience.' },
                { skill: 'Voice Modulation', score: 80, feedback: 'Good variation in tone, continue practicing emphasis.' },
                { skill: 'Body Language', score: 75, feedback: 'Natural gestures, work on posture and stance.' },
              ].map((assessment, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900">{assessment.skill}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        assessment.score >= 80
                          ? 'bg-green-100 text-green-800'
                          : assessment.score >= 60
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {assessment.score}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        assessment.score >= 80
                          ? 'bg-green-500'
                          : assessment.score >= 60
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${assessment.score}%` }}
                    />
                  </div>

                  <p className="text-sm text-gray-600">{assessment.feedback}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Overall Assessment</h3>
              <p className="text-blue-800 text-sm">
                You have strong communication fundamentals. Focus on building confidence and maintaining consistent eye contact to enhance your presentation skills further.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
