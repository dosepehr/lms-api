const express = require('express');
const {
    protect,
    restrictTo,
    changeBanStatus,
    signup,
    login,
    changeUserRole,
    updateMe,
    getMe,
} = require('./../Auth/authController');

const authRouter = express.Router();

authRouter.route('/signup').post(signup);
authRouter.route('/login').post(login);
authRouter.route('/ban').put(protect, restrictTo('admin'), changeBanStatus);
authRouter
    .route('/changeRole/:userId')
    .put(protect, restrictTo('admin'), changeUserRole);
authRouter.route('/updateMe').put(protect, updateMe);
authRouter.route('/getMe').get(protect, getMe);
module.exports = authRouter;
