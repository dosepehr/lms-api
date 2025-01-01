const Category = require('./categoryModel');
const { addCategorySchema } = require('./categoryValidator');
const { addOne } = require('../Factory/factoryController');

exports.addCategory = addOne(Category, addCategorySchema);
