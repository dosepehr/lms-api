const express = require('express');
const {
    addCategory,
    deleteCategory,
    getCategory,
    getCategories,
} = require('./categoryController');
const { protect, restrictTo } = require('../Auth/authController');

const categoryRouter = express.Router();

categoryRouter
    .route('/')
    .get(getCategories)
    .post(protect, restrictTo('admin'), addCategory);
categoryRouter
    .route('/:id')
    .get(getCategory)
    .delete(protect, restrictTo('admin'), deleteCategory);
module.exports = categoryRouter;
