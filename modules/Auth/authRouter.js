const express = require('express');
const { protect, restrictTo } = require('./../Auth/authController');
const { signup } = require('./authController');

const authRouter = express.Router();

authRouter.route('/signup').post(signup)
module.exports = authRouter;
