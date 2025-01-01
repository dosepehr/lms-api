const express = require('express');
const {
    protect,
    restrictTo,
    changeBanStatus,
    signup,
    login,
    changeUserRole,
} = require('./../Auth/authController');

const authRouter = express.Router();

authRouter.route('/signup').post(signup);
authRouter.route('/login').post(login);
authRouter.route('/ban').put(protect, restrictTo('admin'), changeBanStatus);
authRouter
    .route('/changeRole/:userId')
    .put(protect, restrictTo('admin'), changeUserRole);
module.exports = authRouter;
