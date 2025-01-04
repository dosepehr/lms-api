const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
            trim: true,
        },
        course: {
            type: mongoose.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        user: {
            type: mongoose.type.ObjectId,
            ref: 'User',
            required: true,
        },
        isAccept: {
            type: Number,
            default: 0,
        },
        isAnswer: {
            type: Number,
            default: 0,
        },
        mainCommentID: {
            type: mongoose.Types.ObjectId,
            ref: 'Comment',
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    },
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
