const Booking = require('../models/bookModels');
const mongoose = require('mongoose');

exports.createBooking = async (req, res) => {
  const { categoryId, bookingDate, userId } = req.body;

  console.log('Received request to create booking:', req.body);

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

  // Validate booking date is not in the past
  const currentDate = new Date();
  if (new Date(bookingDate) < currentDate) {
    return res.status(400).json({
      success: false,
      message: 'Booking date cannot be in the past.'
    });
  }

  try {
    // Check if the date is already booked for the given category
    const existingBooking = await Booking.findOne({ categoryId, bookingDate });
    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'The date is already reserved for this category.'
      });
    }

    // Create a new booking
    const newBooking = new Booking({
      userId,
      categoryId,
      bookingDate
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      success: true,
      booking: savedBooking,
      message: 'Booking successful. Payment should be made 5 days before the booked date, or it will get canceled.'
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking.'
    });
  }
};

// Other functions remain the same

exports.getBookingsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  console.log('Received request to get bookings by category:', categoryId);

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

  console.log('Received request to get bookings by user:', userId);

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
