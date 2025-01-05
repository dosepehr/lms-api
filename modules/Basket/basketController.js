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

exports.deleteBasketItem = expressAsyncHandler(async (req, res, next) => {
    const user = req.user;
    const { course: courseId } = req.body;

    if (!courseId) {
        return next(new AppError('Please provide a course ID', 400));
    }

    const basket = await Basket.findOne({
        user: user.id,
    }).populate('courses');

    if (!basket) {
        return next(new AppError('You have no active basket', 404));
    }

    const courseExists = basket.courses.some(
        (course) => course._id.toString() === courseId,
    );
    if (!courseExists) {
        return next(new AppError('Course not found in the basket', 404));
    }

    basket.courses = basket.courses.filter(
        (course) => course._id.toString() !== courseId,
    );

    await basket.save();
    if (!basket.courses.length) {
        await Basket.deleteOne({ _id: basket._id });
        res.status(200).json({
            status: true,
            message: `user's basket deleted`,
        });
    }
    res.status(200).json({
        status: true,
        message: 'Course removed from basket successfully',
    });
});

exports.deleteMyBasket = expressAsyncHandler(async (req, res, next) => {
    const basket = await Basket.findOne({
        user: req.user._id,
    });
    if (!basket) {
        return next(new AppError('You have no active basket', 404));
    }
    await Basket.deleteOne({
        user: req.user._id,
    });
    res.status(200).json({
        status: true,
        message: 'basket deleted',
    });
});

exports.purchaseBasket = expressAsyncHandler(async (req, res, next) => {
    const { basketId } = req.params;
    const basket = await Basket.findOne({
        _id: basketId,
    });
    if (!basket) {
        return next(new AppError('No basket found', 400));
    }
    //! handle purchasing process

    basket.purchased = true;
    basket.save();
    res.status(200).json({
        status: true,
        message: 'You have access to the courses now',
    });
});
