const { addOne } = require('../Factory/factoryController');
const Comment = require('./CommentModel');

exports.addComment = addOne(Comment);
