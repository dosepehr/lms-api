const express = require('express');
const { addCourse } = require('./courseController');
const { protect, restrictTo } = require('../Auth/authController');

const courseRouter = express.Router();

courseRouter.route('/').post(protect, restrictTo('admin'), addCourse);
courseRouter.route('/:id');

module.exports = courseRouter;
