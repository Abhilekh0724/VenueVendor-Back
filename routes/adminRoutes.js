const router = require('express').Router();
const adminControllers = require('../controllers/adminControllers');

router.post('/create', adminControllers.createCategory);
router.get('/get', adminControllers.getAllCategories);

module.exports = router;
