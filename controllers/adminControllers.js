// controllers/adminControllers.js
const Category = require('../models/adminModels');
const path = require('path');
const fs = require('fs');

// Create a new category
const createCategory = async (req, res) => {
  const { name, info } = req.body;

  if (!req.files || !req.files.photo) {
    return res.status(400).json({
      success: false,
      message: "Photo not found!",
    });
  }

  const { photo } = req.files;

  const photoName = `${Date.now()}-${photo.name}`;
  const photoUploadPath = path.join(__dirname, '../public/uploads', photoName);

  try {
    await photo.mv(photoUploadPath);

    const newCategory = new Category({
      name,
      info,
      photo: `/uploads/${photoName}`,
    });

    const category = await newCategory.save();
    res.status(201).json({
      success: true,
      message: "Category Created!",
      data: category,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

// Fetch all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully!",
      categories: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};
