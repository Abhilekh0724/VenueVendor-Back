const express = require('express');
const { uploadProfilePic } = require('../controllers/profileControllers');
const { authGuard } = require('../middleware/authGuard'); // Import the authGuard middleware
const router = express.Router();

// Apply authGuard middleware to ensure only authenticated users can access this route
router.post('/uploadProfilePic', authGuard, uploadProfilePic);

module.exports = router;
