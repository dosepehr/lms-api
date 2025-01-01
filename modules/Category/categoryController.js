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

exports.addCategory = addOne(Category, addCategorySchema);
exports.deleteCategory = deleteOne(Category);

exports.getCategories = getAll(Category);
exports.getCategory = getOne(Category);

exports.updateCategory = updateOne(Category, editCategorySchema);
