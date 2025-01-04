const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    },
);
categorySchema.virtual('courses', {
    ref: 'Course',
    foreignField: 'category',
    localField: '_id',
});
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
