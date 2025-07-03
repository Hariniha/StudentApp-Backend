import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Search, Smile, Frown, Meh, Heart, Zap, CloudRain, Edit2, Trash2 } from 'lucide-react';
import axios from 'axios';

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
  const [entries, setEntries] = useState([]);

  // NEW: track editing mode and current editing entry id
  const [editingEntryId, setEditingEntryId] = useState(null);

  const filteredEntries = entries.filter(entry =>
    entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    axios.get(`http://localhost:5000/api/journal?search=${searchQuery}`)
      .then(res => setEntries(res.data))
      .catch(console.error);
  }, [searchQuery]);

  // Add or update entry handler
  const handleAddEntry = async () => {
    try {
      if (editingEntryId) {
        // EDIT existing entry
        await axios.put(`http://localhost:5000/api/journal/${editingEntryId}`, {
          content: newEntry,
          mood: selectedMood,
          tags: newTags.split(',').map(t => t.trim()),
        });
      } else {
        // ADD new entry
        await axios.post('http://localhost:5000/api/journal', {
          content: newEntry,
          mood: selectedMood,
          tags: newTags.split(',').map(t => t.trim()),
        });
      }
      // Reset modal state
      setShowAddEntry(false);
      setNewEntry('');
      setNewTags('');
      setSelectedMood('neutral');
      setEditingEntryId(null);

      // Refetch updated list
      const res = await axios.get('http://localhost:5000/api/journal');
      setEntries(res.data);
    } catch (error) {
      console.error('Failed to save entry:', error);
    }
  };

  const handleDeleteEntry = async (id) => {
  if (!window.confirm('Are you sure you want to delete this entry?')) return;
  try {
    await axios.delete(`http://localhost:5000/api/journal/${id}`);
    setEntries(entries.filter(entry => entry.id !== id));
  } catch (error) {
    console.error('Failed to delete entry:', error);
  }
};
  // Open modal for editing
  const openEditModal = (entry) => {
    setEditingEntryId(entry.id);
    setNewEntry(entry.content);
    setNewTags(entry.tags.join(', '));
    setSelectedMood(entry.mood);
    setShowAddEntry(true);
  };

  return (
    <div className="space-y-6">
      {/* Header and New Entry Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Personal Journal</h1>
          <p className="text-gray-600 mt-2">Reflect on your thoughts and track your emotional journey</p>
        </div>
        <button
          onClick={() => {
            // Reset modal for new entry
            setEditingEntryId(null);
            setNewEntry('');
            setNewTags('');
            setSelectedMood('neutral');
            setShowAddEntry(true);
          }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Entry</span>
        </button>
      </div>

      {/* Search Input */}
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

      {/* Entries List */}
      <div className="space-y-6">
        {filteredEntries.map((entry) => {
          const MoodIcon = moodIcons[entry.mood]?.icon || Meh;
          return (
            <div key={entry.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${moodIcons[entry.mood]?.bg || 'bg-gray-100'}`}>
                    <MoodIcon className={`w-5 h-5 ${moodIcons[entry.mood]?.color || 'text-gray-500'}`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(entry.date).toLocaleDateString('en-US', {
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

                {/* Edit & Delete Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => openEditModal(entry)}
                    className="text-indigo-600 hover:text-indigo-800"
                    aria-label="Edit Entry"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Delete Entry"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <p className="text-gray-800 leading-relaxed mb-4">{entry.content}</p>

              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag, index) => (
                  <span
                    key={`${entry.id}-${tag}-${index}`}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Entry Modal */}
      {showAddEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {editingEntryId ? 'Edit Journal Entry' : 'Add Journal Entry'}
            </h3>

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
                      type="button"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">What's on your mind?</label>
                <textarea
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                  placeholder="Write about your day, thoughts, feelings, or experiences..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
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
                onClick={() => {
                  setShowAddEntry(false);
                  setEditingEntryId(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEntry}
                disabled={!newEntry.trim()}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50"
                type="button"
              >
                {editingEntryId ? 'Update Entry' : 'Save Entry'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
