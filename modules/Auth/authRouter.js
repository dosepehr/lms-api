const express = require('express');
const {
    protect,
    restrictTo,
} = require('./../Auth/authController');

const userRouter = express.Router();

module.exports = userRouter;
