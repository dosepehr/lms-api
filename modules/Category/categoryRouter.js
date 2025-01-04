const express = require('express');
const {
    addCategory,
    deleteCategory,
    getCategory,
    getCategories,
    updateCategory,
    getCategoryBySlug,
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
    .put(protect, restrictTo('admin'), updateCategory)
    .delete(protect, restrictTo('admin'), deleteCategory);

categoryRouter.route('/slug/:slug').get(getCategoryBySlug);

module.exports = categoryRouter;
