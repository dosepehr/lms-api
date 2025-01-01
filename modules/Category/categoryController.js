const Category = require('./categoryModel');
const { addCategorySchema } = require('./categoryValidator');
const { addOne, deleteOne } = require('../Factory/factoryController');

exports.addCategory = addOne(Category, addCategorySchema);
exports.deleteCategory = deleteOne(Category);
