const { addOne } = require('../Factory/factoryController');
const Course = require('./courseModel');
const { addCourseSchema } = require('./courseValidator');

exports.addCourse = addOne(Course, addCourseSchema);
