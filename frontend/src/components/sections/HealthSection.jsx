import React, { useState } from 'react';
import { Heart, Activity, Moon, Utensils, Droplets, Timer, TrendingUp } from 'lucide-react';

const healthTips = [
  {
    category: 'Mental Health',
    icon: Heart,
    color: 'from-pink-500 to-red-500',
    tips: [
      'Take regular breaks during study sessions',
      'Practice mindfulness and meditation',
      'Maintain social connections with friends',
      'Seek help when feeling overwhelmed',
    ],
  },
  {
    category: 'Physical Health',
    icon: Activity,
    color: 'from-green-500 to-teal-500',
    tips: [
      'Exercise for at least 30 minutes daily',
      'Maintain good posture while studying',
      'Take walking breaks every hour',
      'Stretch regularly to prevent stiffness',
    ],
  },
  {
    category: 'Sleep Health',
    icon: Moon,
    color: 'from-indigo-500 to-purple-500',
    tips: [
      'Maintain a consistent sleep schedule',
      'Aim for 7-9 hours of sleep nightly',
      'Avoid screens before bedtime',
      'Create a relaxing bedtime routine',
    ],
  },
  {
    category: 'Nutrition',
    icon: Utensils,
    color: 'from-orange-500 to-yellow-500',
    tips: [
      'Eat balanced meals with all food groups',
      'Stay hydrated throughout the day',
      'Limit processed and sugary foods',
      'Include brain-healthy foods like nuts and fish',
    ],
  },
];

const dailyTrackers = [
  { name: 'Water Intake', target: 8, current: 6, unit: 'glasses', icon: Droplets },
  { name: 'Study Hours', target: 6, current: 4.5, unit: 'hours', icon: Timer },
  { name: 'Physical Activity', target: 30, current: 25, unit: 'minutes', icon: Activity },
  { name: 'Sleep Quality', target: 8, current: 7, unit: 'hours', icon: Moon },
];

const wellnessActivities = [
  {
    title: 'Stress Management',
    description: 'Learn techniques to manage academic stress effectively',
    duration: '10 min',
    type: 'Guide',
    image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    title: 'Breathing Exercises',
    description: 'Simple breathing techniques for anxiety and focus',
    duration: '5 min',
    type: 'Exercise',
    image: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    title: 'Study Break Workouts',
    description: 'Quick exercises you can do between study sessions',
    duration: '15 min',
    type: 'Workout',
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

export const HealthSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Health & Wellness</h1>
        <p className="text-gray-600 mt-2">Take care of your physical and mental well-being</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Health Tips & Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {healthTips.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(index)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedCategory === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-medium text-gray-900">{category.category}</h3>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {healthTips[selectedCategory].category} Tips
              </h3>
              <ul className="space-y-3">
                {healthTips[selectedCategory].tips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Wellness Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {wellnessActivities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{activity.title}</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {activity.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{activity.duration}</span>
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        Start
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Daily Wellness Tracker
            </h3>
            <div className="space-y-4">
              {dailyTrackers.map((tracker, index) => {
                const IconComponent = tracker.icon;
                const percentage = (tracker.current / tracker.target) * 100;
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <IconComponent className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">{tracker.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {tracker.current}/{tracker.target} {tracker.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          percentage >= 100
                            ? 'bg-green-500'
                            : percentage >= 75
                            ? 'bg-yellow-500'
                            : 'bg-blue-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-teal-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Reminder</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Take a 5-minute break every hour</span>
              </div>
              <div className="flex items-center space-x-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span>Drink water regularly</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-green-500" />
                <span>Stand and stretch periodically</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Health Check</h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Stress Level Assessment</span>
                  <span className="text-xs text-gray-500">2 min</span>
                </div>
              </button>
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sleep Quality Check</span>
                  <span className="text-xs text-gray-500">1 min</span>
                </div>
              </button>
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Energy Level Monitor</span>
                  <span className="text-xs text-gray-500">1 min</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
