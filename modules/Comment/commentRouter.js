const express = require('express');
const { addComment } = require('./commentController');
const { protect, restrictTo } = require('../Auth/authController');

const commentRouter = express.Router();

commentRouter.route('/').post(protect, addComment);

module.exports = commentRouter;
