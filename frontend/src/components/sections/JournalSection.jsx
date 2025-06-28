import React, { useState } from 'react';
import { Plus, Calendar, Search, Smile, Frown, Meh, Heart, Zap, CloudRain } from 'lucide-react';

const mockEntries = [
  {
    id: '1',
    content: "Had a great day today! Aced my math test and felt really confident during the presentation. Looking forward to tomorrow's science experiment.",
    mood: 'happy',
    date: new Date('2024-01-20'),
    tags: ['school', 'achievement', 'confidence'],
  },
  {
    id: '2',
    content: 'Feeling a bit overwhelmed with all the assignments due this week. Need to create a better study schedule and prioritize my tasks.',
    mood: 'anxious',
    date: new Date('2024-01-19'),
    tags: ['stress', 'planning', 'academics'],
  },
  {
    id: '3',
    content: 'Volunteered at the local library today. It felt amazing to help younger kids with their reading. Definitely want to do more community service.',
    mood: 'excited',
    date: new Date('2024-01-18'),
    tags: ['volunteer', 'community', 'fulfillment'],
  },
];

const moodIcons = {
  happy: { icon: Smile, color: 'text-green-500', bg: 'bg-green-100' },
  sad: { icon: Frown, color: 'text-blue-500', bg: 'bg-blue-100' },
  neutral: { icon: Meh, color: 'text-gray-500', bg: 'bg-gray-100' },
  excited: { icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-100' },
  anxious: { icon: CloudRain, color: 'text-purple-500', bg: 'bg-purple-100' },
  confident: { icon: Heart, color: 'text-red-500', bg: 'bg-red-100' },
};

export const JournalSection = () => {
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [selectedMood, setSelectedMood] = useState('neutral');
  const [searchQuery, setSearchQuery] = useState('');
  const [newEntry, setNewEntry] = useState('');
  const [newTags, setNewTags] = useState('');

  const filteredEntries = mockEntries.filter(entry =>
    entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddEntry = () => {
    console.log('Adding entry:', {
      content: newEntry,
      mood: selectedMood,
      tags: newTags.split(',').map(t => t.trim()),
    });
    setShowAddEntry(false);
    setNewEntry('');
    setNewTags('');
    setSelectedMood('neutral');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Personal Journal</h1>
          <p className="text-gray-600 mt-2">Reflect on your thoughts and track your emotional journey</p>
        </div>
        <button
          onClick={() => setShowAddEntry(true)}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Entry</span>
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search journal entries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-6">
        {filteredEntries.map((entry) => {
          const MoodIcon = moodIcons[entry.mood].icon;
          return (
            <div key={entry.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${moodIcons[entry.mood].bg}`}>
                    <MoodIcon className={`w-5 h-5 ${moodIcons[entry.mood].color}`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {entry.date.toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      Mood: {entry.mood}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-800 leading-relaxed mb-4">{entry.content}</p>

              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {showAddEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Add Journal Entry</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">How are you feeling?</label>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(moodIcons).map(([mood, { icon: Icon, color, bg }]) => (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedMood === mood
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`${bg} p-2 rounded-full mx-auto mb-2 w-fit`}>
                        <Icon className={`w-6 h-6 ${color}`} />
                      </div>
                      <span className="text-sm font-medium capitalize">{mood}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's on your mind?
                </label>
                <textarea
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                  placeholder="Write about your day, thoughts, feelings, or experiences..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="school, friends, goals, reflection..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-8">
              <button
                onClick={() => setShowAddEntry(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEntry}
                disabled={!newEntry.trim()}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50"
              >
                Save Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
