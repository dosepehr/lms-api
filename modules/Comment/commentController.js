const expressAsyncHandler = require('express-async-handler');
const { addOne, getAll } = require('../Factory/factoryController');
const Comment = require('./commentModel');

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
