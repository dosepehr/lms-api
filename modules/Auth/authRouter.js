const express = require('express');
const { protect, restrictTo } = require('./../Auth/authController');

const authRouter = express.Router();

module.exports = authRouter;
