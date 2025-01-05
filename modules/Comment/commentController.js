const expressAsyncHandler = require('express-async-handler');
const { addOne, getAll } = require('../Factory/factoryController');
const Comment = require('./commentModel');
const AppError = require('../../utils/AppError');

exports.addComment = addOne(Comment);
exports.getComments = getAll(Comment, {}, [
    {
        path: 'course',
        select: 'title',
    },
    {
        path: 'user',
        select: 'username',
    },
    {
        path: 'answers',
        populate: { path: 'user', select: 'name email' },
    },
]);

exports.changeCommentStatus = expressAsyncHandler(async (req, res, next) => {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
        res.status(404).json({
            status: false,
            message: 'No comment found',
        });
    }
    comment.isAccept = comment.isAccept ? 0 : 1;
    comment.save();
    res.status(200).json({
        status: true,
        message: `comment ${comment.isAccept ? 'accepted' : 'rejected'}`,
    });
});

exports.answerComment = expressAsyncHandler(async (req, res, next) => {
    const { comment, course, user } = req.body;
    const { commentId } = req.params;
    const parentComment = await Comment.findOne({
        _id: commentId,
    });
    if (!parentComment) {
        return next(new AppError('No comment found with this id'));
    }
    const newComment = await Comment.create({
        comment,
        course,
        user,
    });
    parentComment.answers.push(newComment._id);
    parentComment.save();
    res.status(200).json({
        status: true,
        message: 'comment added',
    });
});
