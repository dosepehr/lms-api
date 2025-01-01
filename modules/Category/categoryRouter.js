const express = require('express');
const { addCategory, deleteCategory } = require('./categoryController');
const { protect, restrictTo } = require('../Auth/authController');

const categoryRouter = express.Router();

categoryRouter.route('/').post(protect, restrictTo('admin'), addCategory);
categoryRouter
    .route('/:id')
    .delete(protect, restrictTo('admin'), deleteCategory);
module.exports = categoryRouter;
