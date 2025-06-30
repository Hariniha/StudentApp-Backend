import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StatsCard } from '../dashboard/StatsCard';
import { ProgressChart } from '../dashboard/ProgressChart';
import { User, Trophy, BookOpen, Target, TrendingUp, Calendar } from 'lucide-react';

export const Dashboard = () => {
  const [progressData, setProgressData] = useState([]);

  const trends = ['up', 'down', 'stable'];

useEffect(() => {
  const fetchProgress = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/marksheets');

      // Sort marksheets by upload date
      const sorted = [...res.data].sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));

      const subjectMap = {};
      const progressData = [];

      sorted.forEach((mark) => {
        const currentScore = gradeToScore(mark.grade);

        if (!subjectMap[mark.subject]) {
          // First time seeing this subject
          subjectMap[mark.subject] = { lastScore: currentScore };
          progressData.push({
            subject: mark.subject,
            score: currentScore,
            trend: 'stable',
          });
        } else {
          const prevScore = subjectMap[mark.subject].lastScore;
          let trend = 'stable';
          if (currentScore > prevScore) trend = 'up';
          else if (currentScore < prevScore) trend = 'down';

          progressData.push({
            subject: mark.subject,
            score: currentScore,
            trend,
          });

          // Update latest score
          subjectMap[mark.subject].lastScore = currentScore;
        }
      });

      // Keep only the latest entry per subject (if needed)
      const latestProgress = Object.values(
        progressData.reduce((acc, item) => {
          acc[item.subject] = item;
          return acc;
        }, {})
      );

      setProgressData(latestProgress);
    } catch (err) {
      console.error('Failed to fetch marksheet data:', err);
    }
  };

  fetchProgress();
}, []);



  const gradeToScore = (grade) => {
    const gradeMap = {
      'A+': 95,
      A: 90,
      'B+': 85,
      B: 80,
      'C+': 75,
      C: 70,
    };
    return gradeMap[grade] || 60;
  };

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
        <ProgressChart data={progressData} />

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
