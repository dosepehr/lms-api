const express = require('express');
const { addBasket, getUserBasket } = require('./basketController');
const { protect, restrictTo } = require('../Auth/authController');

const basketRouter = express.Router();

basketRouter.post('/add', protect, addBasket);
basketRouter.get(
    '/getUserBasket/:phone',
    protect,
    restrictTo('admin'),
    getUserBasket,
);
module.exports = basketRouter;
