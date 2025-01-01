const express = require('express');
const { addCategory } = require('./categoryController');
const { protect, restrictTo } = require('../Auth/authController');

const categoryRouter = express.Router();

categoryRouter.route('/').post(protect, restrictTo('admin'), addCategory);

module.exports = categoryRouter;
