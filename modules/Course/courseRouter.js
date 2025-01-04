const express = require('express');
const {
    addCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    getCourseBySlug,
} = require('./courseController');
const { protect, restrictTo } = require('../Auth/authController');
const { resizeImage } = require('../../utils/imageProcess');
const uploader = require('../../utils/fileUploader');

const courseRouter = express.Router();

courseRouter
    .route('/')
    .get(getCourses)
    .post(
        protect,
        restrictTo('admin'),
        uploader(
            [{ name: 'cover', validExtensions: ['.png', '.jpg'] }],
            3 * 1024 * 1024,
        ).single('cover'),
        resizeImage,
        addCourse,
    );
courseRouter
    .route('/:id')
    .get(getCourse)
    .put(protect, restrictTo('admin'), updateCourse)
    .delete(protect, restrictTo('admin'), deleteCourse);
courseRouter.route('/slug/:slug').get(getCourseBySlug);
module.exports = courseRouter;
