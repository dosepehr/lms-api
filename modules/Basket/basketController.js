const expressAsyncHandler = require('express-async-handler');
const Basket = require('./BasketModel');
const AppError = require('../../utils/AppError');

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
