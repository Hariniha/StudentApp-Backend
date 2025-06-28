const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  title: String,
  description: String,
  mediaUrl: String,
  mediaType: String,
  date: { type: Date, default: Date.now },
  category: String,
});

module.exports = mongoose.model('Achievement', AchievementSchema);
