const expressAsyncHandler = require('express-async-handler');
const User = require('./../User/userModel');
const AppError = require('../../utils/AppError');
const verifyToken = require('../../utils/verifyToken');

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
