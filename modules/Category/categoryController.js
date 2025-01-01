const expressAsyncHandler = require('express-async-handler');
const Category = require('./categoryModel');

exports.addCategory = expressAsyncHandler(async (req, res, next) => {
    await Category.create(req.body);
    res.status(201).json({
        status: true,
        messege: 'category created',
    });
});
