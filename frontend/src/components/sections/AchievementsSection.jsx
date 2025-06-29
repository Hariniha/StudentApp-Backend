import React, { useState, useEffect } from 'react';
import { Plus, Trophy, Star, Upload, Camera, Video, Pencil, Trash2 } from 'lucide-react';

export const AchievementsSection = () => {
  const [showAddAchievement, setShowAddAchievement] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [editId, setEditId] = useState(null);

  const categories = ['all', 'Academic', 'Research', 'Community', 'Sports', 'Arts'];

  useEffect(() => {
    fetch('http://localhost:5000/api/achievements')
      .then((res) => res.json())
      .then((data) => setAchievements(data))
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  const filteredAchievements =
    selectedCategory === 'all'
      ? achievements
      : achievements.filter((achievement) => achievement.category === selectedCategory);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setMediaFile(null);
    setEditId(null);
    setShowAddAchievement(false);
  };

  const handleAddOrEditAchievement = async () => {
    if (!title || !description || !category || (!mediaFile && !editId)) {
      alert('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    if (mediaFile) formData.append('media', mediaFile);

    try {
      const res = await fetch(
        editId
          ? `http://localhost:5000/api/achievements/${editId}`
          : 'http://localhost:5000/api/achievements',
        {
          method: editId ? 'PUT' : 'POST',
          body: formData,
        }
      );

      const data = await res.json();

      if (editId) {
        setAchievements(achievements.map((a) => (a._id === editId ? data : a)));
      } else {
        setAchievements([data, ...achievements]);
      }

      resetForm();
    } catch (err) {
      console.error('Error submitting achievement:', err);
      alert('Submission failed: ' + (err.message || 'Unknown error'));
    }
  };

  const handleDeleteAchievement = async (id) => {
    if (!window.confirm('Are you sure you want to delete this achievement?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/achievements/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      setAchievements(achievements.filter((a) => a._id !== id));
    } catch (err) {
      console.error('Error deleting achievement:', err);
      alert('Failed to delete achievement');
    }
  };

  const handleEditClick = (achievement) => {
    setTitle(achievement.title);
    setDescription(achievement.description);
    setCategory(achievement.category);
    setEditId(achievement._id);
    setShowAddAchievement(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
          <p className="text-gray-600 mt-2">Showcase your accomplishments and milestones</p>
        </div>
        <button
          onClick={() => setShowAddAchievement(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Achievement</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-purple-100 text-purple-800 border border-purple-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'All Categories' : category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => (
          <div
            key={achievement._id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
          >
            {achievement.mediaUrl && (
              <div className="relative h-48">
                {achievement.mediaType === 'image' ? (
                  <img
                    src={`http://localhost:5000${achievement.mediaUrl}`}
                    alt={achievement.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={`http://localhost:5000${achievement.mediaUrl}`}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-full">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{achievement.title}</h3>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                  {achievement.category}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4">{achievement.description}</p>

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  {new Date(achievement.date).toLocaleDateString()}
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleEditClick(achievement)} title="Edit">
                    <Pencil className="w-4 h-4 text-blue-500 hover:text-blue-700" />
                  </button>
                  <button onClick={() => handleDeleteAchievement(achievement._id)} title="Delete">
                    <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddAchievement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editId ? 'Edit Achievement' : 'Add New Achievement'}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Achievement title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <textarea
                placeholder="Description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select category</option>
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setMediaFile(e.target.files[0])}
                className="w-full"
              />
              {mediaFile && <p className="text-xs mt-1">{mediaFile.name}</p>}
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={resetForm}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrEditAchievement}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700"
              >
                {editId ? 'Update' : 'Add Achievement'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
