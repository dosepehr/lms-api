const express = require('express');
const {
    addCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
} = require('./courseController');
const { protect, restrictTo } = require('../Auth/authController');
const uploader = require('../../utils/fileUploader');
const { resizePhoto } = require('../../utils/resizePhoto');

const courseRouter = express.Router();

courseRouter
    .route('/')
    .get(getCourses)
    .post(
        protect,
        restrictTo('admin'),
        uploader(['.png'], 3 * 1000 * 1000).single('cover'),
        resizePhoto,
        addCourse,
    );
courseRouter
    .route('/:id')
    .get(getCourse)
    .put(protect, restrictTo('admin'), updateCourse)
    .delete(protect, restrictTo('admin'), deleteCourse);

module.exports = courseRouter;
