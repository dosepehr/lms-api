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

exports.getCourse = getOne(Course, {}, [
    {
        path: 'category',
    },
]);

exports.updateCourse = updateOne(Course, updateCourseSchema);
exports.deleteCourse = deleteOne(Course);
