const express = require('express');
const multer = require('multer');
const router = express.Router();
const Achievement = require('../models/Achievement');
const fs = require('fs');
const path = require('path');

// File storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Get all achievements
router.get('/', async (req, res) => {
  const achievements = await Achievement.find().sort({ date: -1 });
  res.json(achievements);
});

// Create new achievement
router.post('/', upload.single('media'), async (req, res) => {
  const { title, description, category } = req.body;
  const mediaType = req.file.mimetype.startsWith('video') ? 'video' : 'image';

  const newAchievement = new Achievement({
    title,
    description,
    mediaUrl: `/uploads/${req.file.filename}`,
    mediaType,
    category,
  });

  await newAchievement.save();
  res.status(201).json(newAchievement);
});



router.put('/:id', upload.single('media'), async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) return res.status(404).json({ error: 'Not found' });

    achievement.title = title;
    achievement.description = description;
    achievement.category = category;

    if (req.file) {
      achievement.mediaUrl = `/uploads/${req.file.filename}`;
      achievement.mediaType = req.file.mimetype.startsWith('video') ? 'video' : 'image';
    }

    const updated = await achievement.save();
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);

    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }

    // Delete the uploaded file too (optional)
    const filePath = path.join(__dirname, '..', achievement.mediaUrl);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.warn('Media file not found or already deleted:', filePath);
      }
    });

    res.status(200).json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete achievement' });
  }
});

module.exports = router;
