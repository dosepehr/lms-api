const { addOne, getAll, getOne } = require('../Factory/factoryController');
const Course = require('./courseModel');
const { addCourseSchema } = require('./courseValidator');

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
