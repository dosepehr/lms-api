const express = require('express');
const {
    addCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
} = require('./courseController');
const { protect, restrictTo } = require('../Auth/authController');
const { imageUploader } = require('../../utils/fileUploader');
const { resizeImage } = require('../../utils/imageProcess');

const courseRouter = express.Router();

courseRouter
    .route('/')
    .get(getCourses)
    .post(
        protect,
        restrictTo('admin'),
        imageUploader(['.png'], 3 * 1000 * 1000).single('cover'),
        resizeImage,
        addCourse,
    );
courseRouter
    .route('/:id')
    .get(getCourse)
    .put(protect, restrictTo('admin'), updateCourse)
    .delete(protect, restrictTo('admin'), deleteCourse);

module.exports = courseRouter;
