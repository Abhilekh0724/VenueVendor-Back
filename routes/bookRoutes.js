// routes/bookRoutes.js
const router = require('express').Router();
const BookingController = require('../controllers/bookControllers');

// Create a booking
router.post('/book', BookingController.createBooking);

// Get bookings by category
router.get('/category/:categoryId', BookingController.getBookingsByCategory);

// Get bookings by user
router.post('/bookeduser', BookingController.getBookingsByUser);

module.exports = router;
