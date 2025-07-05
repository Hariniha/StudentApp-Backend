const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.js');
const quizRoutes = require('./routes/quizzes.js');


dotenv.config();
const fs = require('fs');
const path = require('path');

const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}



const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/data', express.static(path.join(__dirname, 'data')));




mongoose.connect(process.env.MONGO_URI, {
  
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
const achievementsRoutes = require('./routes/achievements.js');
app.use('/api/achievements', achievementsRoutes);
app.use('/api/marksheets', require('./routes/marksheets.js'));
app.use('/api/quizzes', quizRoutes);
// Routes
const journalRoutes = require('./routes/journalRoutes.js');
app.use('/api/journal', journalRoutes);



// Start server

app.listen(5000, () => console.log('Server running on http://localhost:5000'));