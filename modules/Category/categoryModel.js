const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    },
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
