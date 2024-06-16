// profileRoutes.js

const express = require('express');
const { uploadProfilePic } = require('../controllers/profileControllers');
const router = express.Router();

router.post('/uploadProfilePic', uploadProfilePic);

module.exports = router;
