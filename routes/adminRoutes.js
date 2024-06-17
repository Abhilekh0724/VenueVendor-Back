const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/adminControllers');

// Routes for categories
router.post('/admin', categoryController.createCategory);
router.get('/admin', categoryController.getAllCategories);

module.exports = router;
