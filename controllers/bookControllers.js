const Booking = require('../models/bookModels');
const mongoose = require('mongoose');

exports.createBooking = async (req, res) => {
  const { categoryId, bookingDate, userId } = req.body;

  // Validate required fields
  if (!categoryId || !bookingDate || !userId) {
    return res.status(400).json({
      success: false,
      message: 'Category ID, booking date, and user ID are required.'
    });
  }

  // Validate ObjectIds
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid categoryId.'
    });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid userId.'
    });
  }

  try {
    const newBooking = new Booking({
      userId,
      categoryId,
      bookingDate
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      success: true,
      booking: savedBooking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking.'
    });
  }
};

exports.getBookingsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  // Validate categoryId
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid categoryId.'
    });
  }

  try {
    const bookings = await Booking.find({ categoryId }).populate('userId');
    res.status(200).json({
      success: true,
      bookings
    });
  } catch (error) {
    console.error('Error fetching bookings by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings.'
    });
  }
};

exports.getBookingsByUser = async (req, res) => {
  const { userId } = req.body;

  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid userId.'
    });
  }

  try {
    const bookings = await Booking.find({ userId }).populate('categoryId');
    res.status(200).json({
      success: true,
      bookings
    });
  } catch (error) {
    console.error('Error fetching bookings by user:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings.'
    });
  }
};
