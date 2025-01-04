const express = require('express');
const { addComment, getComments } = require('./commentController');
const { protect, restrictTo } = require('../Auth/authController');

const commentRouter = express.Router();

commentRouter.route('/').post(protect, addComment).get(getComments);

module.exports = commentRouter;
