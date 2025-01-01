const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        cover: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['pre-registration', 'ongoing', 'finished', 'cancelled'],
            default: 'pre-registration',
        },
        pre: {
            type: String,
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    },
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
