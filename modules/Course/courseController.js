const expressAsyncHandler = require('express-async-handler');
const {
    addOne,
    getAll,
    getOne,
    updateOne,
    deleteOne,
} = require('../Factory/factoryController');
const Course = require('./courseModel');
const { addCourseSchema, updateCourseSchema } = require('./courseValidator');

exports.addCourse = addOne(Course, addCourseSchema);
exports.getCourses = getAll(Course, {}, [
    {
        path: 'category',
    },
]);

exports.getCourse = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const data = await Course.findById(id)
        .populate('category')
        .populate({
            path: 'comments',
            populate: { path: 'user', select: 'name email' },
        })
        .populate({
            path: 'sessions',
            select: 'title free',
        });
    if (!data) {
        return res.status(404).json({
            status: false,
            message: 'Resource not found',
        });
    }
    const otherCourses = await Course.find({
        category: data.category._id,
    });
    res.status(200).json({
        status: true,
        data,
        other: otherCourses,
    });
});

exports.updateCourse = updateOne(Course, updateCourseSchema);
exports.deleteCourse = deleteOne(Course);

exports.getCourseBySlug = expressAsyncHandler(async (req, res, next) => {
    const { slug } = req.params;
    const data = await Course.findOne({ slug });
    if (!data) {
        return res.status(404).json({
            status: false,
            message: 'Resource not found',
        });
    }

    res.status(200).json({
        status: true,
        data,
    });
});
