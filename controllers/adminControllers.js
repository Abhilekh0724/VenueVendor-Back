const Category = require('../models/adminModels');
const path = require('path');
const fs = require('fs');

// Create a new category
exports.createCategory = async (req, res) => {
  const { name, info } = req.body;
  const { photo } = req.files;

  const photoPath = path.join(__dirname, '../public/uploads', photo.name);

  try {
    // Save the file
    await photo.mv(photoPath);

    const newCategory = await Category.create({
      name,
      info,
      photo: `/uploads/${photo.name}`,
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
