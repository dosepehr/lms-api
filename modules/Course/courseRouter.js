const express = require('express');
const {
    addCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
} = require('./courseController');
const { protect, restrictTo } = require('../Auth/authController');

const courseRouter = express.Router();

courseRouter
    .route('/')
    .get(getCourses)
    .post(protect, restrictTo('admin'), addCourse);
courseRouter
    .route('/:id')
    .get(getCourse)
    .put(protect, restrictTo('admin'), updateCourse)
    .delete(protect, restrictTo('admin'), deleteCourse);

module.exports = courseRouter;
