const express = require('express');
const router = express.Router();
const Marksheet = require('../models/Marksheet');

// Get all marksheets
router.get('/', async (req, res) => {
  const marksheets = await Marksheet.find().sort({ uploadDate: -1 });
  res.json(marksheets);
});

// Upload new marksheet (simplified version)
router.post('/', async (req, res) => {
  const { name, subject, semester, grade, fileSize, fileUrl } = req.body;

  const newMarksheet = new Marksheet({
    name,
    subject,
    semester,
    grade,
    // fileSize,
    // fileUrl,
  });

  await newMarksheet.save();
  res.status(201).json(newMarksheet);
});

router.delete('/:id', async (req, res) => {
  try {
    await Marksheet.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Deletion failed' });
  }
});

module.exports = router;
