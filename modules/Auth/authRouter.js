const express = require('express');
const {
    protect,
    restrictTo,
    changeBanStatus,
    signup
} = require('./../Auth/authController');

const authRouter = express.Router();

authRouter.route('/signup').post(signup);
authRouter.route('/ban').put(protect, restrictTo('admin'), changeBanStatus);
module.exports = authRouter;
