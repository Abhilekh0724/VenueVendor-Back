// models/bookModels.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Ensure this is correct
    required: true,
    },
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
