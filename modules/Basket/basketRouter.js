const express = require('express');
const {
    addBasket,
    getUserBasket,
    getMyBasket,
    deleteBasketItem,
} = require('./basketController');
const { protect, restrictTo } = require('../Auth/authController');

const basketRouter = express.Router();

basketRouter.post('/add', protect, addBasket);
basketRouter.get(
    '/userBasket/:phone',
    protect,
    restrictTo('admin'),
    getUserBasket,
);
basketRouter.get('/myBasket', protect, getMyBasket);
basketRouter.post('/deleteItem', protect, deleteBasketItem);
module.exports = basketRouter;
