const expressAsyncHandler = require('express-async-handler');
const Category = require('./categoryModel');
const { addCategorySchema } = require('./categoryValidator');

exports.addCategory = expressAsyncHandler(async (req, res, next) => {
    await addCategorySchema.validate(req.body);
    await Category.create(req.body);
    res.status(201).json({
        status: true,
        messege: 'category created',
    });
});
