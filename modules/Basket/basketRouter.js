const express = require('express');
const { addBasket } = require('./basketController');
const { protect, restrictTo } = require('../Auth/authController');

const basketRouter = express.Router();

basketRouter.post('/add', protect, addBasket);
module.exports = basketRouter;
