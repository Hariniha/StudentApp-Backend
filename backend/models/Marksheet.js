const mongoose = require('mongoose');

const marksheetSchema = new mongoose.Schema({
  name: String,
  subject: String,
  semester: String,
  grade: String,
  // fileSize: String,
  uploadDate: {
    type: Date,
    default: Date.now
  },
  // fileUrl: String // Assuming you'll store the file in cloud or local with a URL
});

module.exports = mongoose.model('Marksheet', marksheetSchema);
