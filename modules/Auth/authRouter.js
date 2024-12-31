const express = require('express');
const {
    protect,
    restrictTo,
    changeBanStatus,
    signup,
    login,
} = require('./../Auth/authController');

const authRouter = express.Router();

authRouter.route('/signup').post(signup);
authRouter.route('/login').post(login);
authRouter.route('/ban').put(protect, restrictTo('admin'), changeBanStatus);
module.exports = authRouter;
