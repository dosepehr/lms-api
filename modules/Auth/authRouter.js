const express = require('express');
const {
    protect,
    restrictTo,
    changeBanStatus,
} = require('./../Auth/authController');
const { signup } = require('./authController');

const authRouter = express.Router();

authRouter.route('/signup').post(signup);
authRouter.route('/ban').put(protect, restrictTo('admin'), changeBanStatus);
module.exports = authRouter;
