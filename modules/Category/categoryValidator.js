const yup = require('yup');

const addCategorySchema = yup.object().shape({
    slug: yup
        .string()
        .min(3, 'The slug must be at least 3 characters long.')
        .max(20, 'The slug must be at most 10 characters long.'),
    title: yup
        .string()
        .min(3, 'The title must be at least 3 characters long.')
        .max(15, 'The title must be at most 10 characters long.'),
});

module.exports = {
    addCategorySchema,
};