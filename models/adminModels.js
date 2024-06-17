const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  info: {
    type: String,
    required: true,
  },
  photo: {
    type: String, // Store the file path or URL of the photo
    required: true,
  },
});

module.exports = mongoose.model('Admin', adminSchema);
