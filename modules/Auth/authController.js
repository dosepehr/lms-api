const expressAsyncHandler = require('express-async-handler');
const User = require('./../User/userModel');
const AppError = require('../../utils/AppError');
const verifyToken = require('../../utils/verifyToken');
const signToken = require('../../utils/signToken');
const hashPassword = require('../../utils/hashPassword');
const formatPhoneNumber = require('../../utils/formatPhoneNumber');
const { signupUserSchema } = require('./authValidator');

exports.protect = expressAsyncHandler(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.auth) {
        token = req.cookies.auth;
    }

    if (!token) {
        return next(new AppError('You are not logged in', 401));
    }

    // 2) Verification token
    const decoded = await verifyToken(token);
    // 3) check if user exists
    const currentUser = await User.findById(decoded?.id);
    if (!currentUser) {
        return next(new AppError('Invalid token', 401));
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError(
                'User recently changed password! Please log in again.',
                401,
            ),
        );
    }
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    "you don't have permission to perform this action",
                    403,
                ),
            );
        }
        next();
    };
};

exports.signup = expressAsyncHandler(async (req, res, next) => {
    const JWT_EXPIRES = +process.env.JWT_EXPIRES.slice(0, 2);
    const userData = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        phone: formatPhoneNumber(req.body.phone),
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
    };
    await signupUserSchema.validate(userData);
    // hash password
    const hashedPassword = await hashPassword(req.body.password);
    userData.password = hashedPassword;
    userData.confirmPassword = undefined;
    const newUser = await User.create(userData);
    const token = signToken({
        id: newUser._id,
    });
    // send token by cookie
    res.cookie('auth', `Bearer ${token}`, {
        expires: new Date(Date.now() + JWT_EXPIRES * 24 * 60 * 60 * 1000),
        secure: req.secure, // if https was on
        httpOnly: true,
    })
        .status(201)
        .json({
            status: true,
        });
});

exports.changeBanStatus = expressAsyncHandler(async (req, res, next) => {
    const { phone } = req.body;
    const user = await User.findOne({
        phone: formatPhoneNumber(phone),
    }).select('ban');
    if (!user) {
        res.status(404).json({
            status: false,
            message: 'no user found with this mobile number',
        });
    }
    user.ban = !user.ban;
    await user.save();
    res.status(200).json({
        status: true,
        message: user.ban ? 'user banned' : 'user is free',
    });
});
