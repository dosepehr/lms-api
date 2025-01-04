const Category = require('./categoryModel');
const {
    addCategorySchema,
    editCategorySchema,
} = require('./categoryValidator');
const {
    addOne,
    deleteOne,
    getAll,
    getOne,
    updateOne,
} = require('../Factory/factoryController');
const expressAsyncHandler = require('express-async-handler');

exports.addCategory = addOne(Category, addCategorySchema);
exports.deleteCategory = deleteOne(Category);

exports.getCategories = getAll(Category);
exports.getCategory = getOne(Category);

exports.updateCategory = updateOne(Category, editCategorySchema);

exports.getCategoryBySlug = expressAsyncHandler(async (req, res, next) => {
    const { slug } = req.params;
    const data = await Category.findOne({ slug });
    if (!data) {
        return res.status(404).json({
            status: false,
            message: 'Resource not found',
        });
    }

    res.status(200).json({
        status: true,
        data,
    });
});
