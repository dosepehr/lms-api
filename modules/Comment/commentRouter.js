const express = require('express');
const {
    addComment,
    getComments,
    changeCommentStatus,
    answerComment,
} = require('./commentController');
const { protect, restrictTo } = require('../Auth/authController');

const commentRouter = express.Router();

commentRouter.route('/').post(protect, addComment).get(getComments);
commentRouter.route('/changeStatus/:commentId').put(changeCommentStatus);
commentRouter.route('/answerComment/:commentId').post(protect, answerComment);

module.exports = commentRouter;
