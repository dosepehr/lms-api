const Category = require('./categoryModel');
const { addCategorySchema } = require('./categoryValidator');
const { addOne, deleteOne, getAll, getOne } = require('../Factory/factoryController');

exports.addCategory = addOne(Category, addCategorySchema);
exports.deleteCategory = deleteOne(Category);

exports.getCategories = getAll(Category);
exports.getCategory = getOne(Category);
