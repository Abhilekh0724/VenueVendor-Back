const Category = require('../models/adminModels');

// Create a new category
exports.createCategory = async (req, res) => {
  const { name, info, photo } = req.body;

  try {
    const newCategory = await Category.create({
      name,
      info,
      photo,
    });

    res.status(201).json({ success: true, category: newCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create category', error });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories', error });
  }
};
