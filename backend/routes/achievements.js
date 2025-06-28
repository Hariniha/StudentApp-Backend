const express = require('express');
const multer = require('multer');
const router = express.Router();
const Achievement = require('../models/Achievement');

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

module.exports = router;
