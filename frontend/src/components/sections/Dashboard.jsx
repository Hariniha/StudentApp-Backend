import React from 'react';
import { StatsCard } from '../dashboard/StatsCard';
import { ProgressChart } from '../dashboard/ProgressChart';
import { User, Trophy, BookOpen, Target, TrendingUp, Calendar } from 'lucide-react';

const mockProgressData = [
  { subject: 'Mathematics', score: 85, trend: 'up' },
  { subject: 'Science', score: 78, trend: 'up' },
  { subject: 'English', score: 92, trend: 'stable' },
  { subject: 'History', score: 76, trend: 'down' },
  { subject: 'Computer Science', score: 88, trend: 'up' },
];

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your progress and achievements</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-semibold text-gray-900">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Quizzes Completed"
          value={12}
          icon={User}
          trend={{ value: '+3 this week', isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Achievements"
          value={8}
          icon={Trophy}
          trend={{ value: '+2 this month', isPositive: true }}
          color="purple"
        />
        <StatsCard
          title="Study Hours"
          value="24h"
          icon={BookOpen}
          trend={{ value: '+5h this week', isPositive: true }}
          color="teal"
        />
        <StatsCard
          title="Goal Progress"
          value="76%"
          icon={Target}
          trend={{ value: '+12% this month', isPositive: true }}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart data={mockProgressData} />

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activities</h3>
          <div className="space-y-4">
            {[
              { activity: 'Completed Confidence Assessment', time: '2 hours ago', icon: User, color: 'blue' },
              { activity: 'Uploaded Math Marksheet', time: '1 day ago', icon: TrendingUp, color: 'green' },
              { activity: 'Added Journal Entry', time: '2 days ago', icon: BookOpen, color: 'purple' },
              { activity: 'Earned Communication Badge', time: '3 days ago', icon: Trophy, color: 'yellow' },
              { activity: 'Set Weekly Goals', time: '5 days ago', icon: Target, color: 'teal' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div
                  className={`p-2 rounded-lg ${
                    item.color === 'blue'
                      ? 'bg-blue-100'
                      : item.color === 'green'
                      ? 'bg-green-100'
                      : item.color === 'purple'
                      ? 'bg-purple-100'
                      : item.color === 'yellow'
                      ? 'bg-yellow-100'
                      : 'bg-teal-100'
                  }`}
                >
                  <item.icon
                    className={`w-4 h-4 ${
                      item.color === 'blue'
                        ? 'text-blue-600'
                        : item.color === 'green'
                        ? 'text-green-600'
                        : item.color === 'purple'
                        ? 'text-purple-600'
                        : item.color === 'yellow'
                        ? 'text-yellow-600'
                        : 'text-teal-600'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.activity}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
