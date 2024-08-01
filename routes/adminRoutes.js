const router = require('express').Router();
const adminControllers = require('../controllers/adminControllers');
const singleControllers = require('../controllers/singleControllers');
const searchControllers = require('../controllers/searchControllers');
// const { authGuard, adminGuard } = require("../middleware/authGuard");

// Admin routes
router.post('/create', adminControllers.createCategory);
router.get('/get', adminControllers.getAllCategories);
router.get('/search', searchControllers.searchCategory);

// Single category route
router.get('/get/:id', singleControllers.getCategoryById);

module.exports = router;
