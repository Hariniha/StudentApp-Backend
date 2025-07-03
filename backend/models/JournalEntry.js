const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
  content: { type: String, required: true },
  mood: { type: String, required: true },
  date: { type: Date, default: Date.now },
  tags: [String]
});

module.exports = mongoose.model('JournalEntry', journalEntrySchema);
