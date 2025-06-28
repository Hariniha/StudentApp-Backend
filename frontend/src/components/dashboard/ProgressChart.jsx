
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const ProgressChart = ({ data }) => {
  const maxScore = Math.max(...data.map(d => d.score));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Progress Overview</h3>
      
      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                item.trend === 'up' ? 'bg-green-100' : 
                item.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
              }`}>
                {item.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                {item.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600" />}
                {item.trend === 'stable' && <Minus className="w-4 h-4 text-gray-600" />}
              </div>
              <span className="font-medium text-gray-900">{item.subject}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    item.score >= 80 ? 'bg-green-500' :
                    item.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${(item.score / maxScore) * 100}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-gray-700 w-12">
                {item.score}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
