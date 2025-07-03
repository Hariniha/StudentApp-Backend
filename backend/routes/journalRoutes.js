const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');

// GET all entries
router.get('/', async (req, res) => {
  const search = req.query.search || '';
  const query = {
    $or: [
      { content: { $regex: search, $options: 'i' } },
      { tags: { $elemMatch: { $regex: search, $options: 'i' } } }
    ]
  };
  const entries = await JournalEntry.find(query).sort({ date: -1 });
  res.json(entries);
});

// POST a new entry
router.post('/', async (req, res) => {
  const { content, mood, tags } = req.body;
  const entry = new JournalEntry({ content, mood, tags });
  await entry.save();
  res.status(201).json(entry);
});

// PUT /api/journal/:id - update existing entry
router.put('/:id', async (req, res) => {
  try {
    const { content, mood, tags } = req.body;
    const updatedEntry = await JournalEntry.findByIdAndUpdate(
      req.params.id,
      { content, mood, tags },
      { new: true, runValidators: true }
    );

    if (!updatedEntry) return res.status(404).json({ error: 'Entry not found' });
    res.json(updatedEntry);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data or ID' });
  }
});

// DELETE /api/journal/:id - delete entry
router.delete('/:id', async (req, res) => {
  try {
    const deletedEntry = await JournalEntry.findByIdAndDelete(req.params.id);
    if (!deletedEntry) return res.status(404).json({ error: 'Entry not found' });
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

module.exports = router;
