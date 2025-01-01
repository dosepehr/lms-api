const express = require('express');
const { addCourse, getCourses, getCourse } = require('./courseController');
const { protect, restrictTo } = require('../Auth/authController');

const courseRouter = express.Router();

courseRouter
    .route('/')
    .get(getCourses)
    .post(protect, restrictTo('admin'), addCourse);
courseRouter.route('/:id').get(getCourse);

module.exports = courseRouter;
