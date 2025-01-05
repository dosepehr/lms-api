const expressAsyncHandler = require('express-async-handler');
const Basket = require('./BasketModel');
const AppError = require('../../utils/AppError');
const User = require('../User/userModel');
const formatPhoneNumber = require('../../utils/formatPhoneNumber');
exports.addBasket = expressAsyncHandler(async (req, res, next) => {
    const { user } = req;
    const { course } = req.body;
    const userBasket = await Basket.findOne({ user });
    if (userBasket) {
        if (userBasket.courses.includes(course)) {
            return next(
                new AppError('course already exists in user basket', 400),
            );
        } else {
            userBasket.courses.push(course);
            userBasket.save();
        }
    } else {
        await Basket.create({
            user: user._id,
            courses: [course],
        });
    }
    res.status(201).json({
        message: 'course added to basket',
        status: true,
    });
});

exports.getUserBasket = expressAsyncHandler(async (req, res, next) => {
    const { phone } = req.params;
    const user = await User.findOne({
        phone: formatPhoneNumber(phone),
    });
    if (!user) {
        return next(new AppError('no user found with this phone number', 404));
    }
    const userBasket = await Basket.findOne({
        user: user._id,
    })
        .populate('user')
        .populate('courses');
    if (!userBasket) {
        return next(new AppError('this user has no active basket', 404));
    }
    res.status(200).json({
        status: true,
        basekt: userBasket,
    });
});

exports.getMyBasket = expressAsyncHandler(async (req, res, next) => {
    const user = req.user;
    const basket = await Basket.findOne({
        user: user.id,
    })
        .populate('user')
        .populate('courses');
    if (!basket) {
        return next(new AppError('you have no active basket', 404));
    }
    res.status(200).json({
        status: 200,
        data: basket,
    });
});
