const mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        videoDuration: {
            type: Number,
            required: true,
        },
        videoUrl: {
            type: String,
            required: true,
        },
        free: {
            type: Boolean,
            default: false,
        },
        source: {
            type: String,
        },
        course: {
            type: mongoose.Schema.ObjectId,
            ref: 'Course',
            required: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    },
);

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
