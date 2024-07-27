const router = require('express').Router();
const adminControllers = require('../controllers/adminControllers');
const searchControllers = require('../controllers/searchControllers');

// Admin routes
router.post('/create', adminControllers.createCategory);
router.get('/get', adminControllers.getAllCategories);
router.get('/search', searchControllers.searchCategory);

module.exports = router;
