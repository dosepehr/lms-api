const { addOne, getAll } = require('../Factory/factoryController');
const Comment = require('./CommentModel');

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
