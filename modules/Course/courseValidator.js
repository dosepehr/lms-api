const yup = require('yup');

const addCourseSchema = yup.object().shape({
    title: yup
        .string()
        .required('The title field is required.')
        .min(3, 'The title must be at least 3 characters long.')
        .max(50, 'The title must be at most 50 characters long.'),
    slug: yup
        .string()
        .required('The slug field is required.')
        .min(3, 'The slug must be at least 3 characters long.')
        .max(50, 'The slug must be at most 50 characters long.'),

    description: yup
        .string()
        .required('The description field is required.')
        .min(10, 'The description must be at least 10 characters long.')
        .max(1000, 'The description must be at most 1000 characters long.'),

    cover: yup.string().required('The cover field is required.'),
    status: yup
        .string()
        .oneOf(
            ['pre-registration', 'ongoing', 'finished', 'cancelled'],
            'Invalid status value.',
        )
        .default('pre-registration'),

    prerequisite: yup.string().nullable(), // Optional field, can be null or undefined
});
const updateCourseSchema = yup.object().shape({
    title: yup
        .string()
        .min(3, 'The title must be at least 3 characters long.')
        .max(50, 'The title must be at most 50 characters long.'),
    slug: yup
        .string()
        .min(3, 'The slug must be at least 3 characters long.')
        .max(50, 'The slug must be at most 50 characters long.'),

    description: yup
        .string()
        .min(10, 'The description must be at least 10 characters long.')
        .max(1000, 'The description must be at most 1000 characters long.'),

    cover: yup.string().required('The cover field is required.'),
    status: yup
        .string()
        .oneOf(
            ['pre-registration', 'ongoing', 'finished', 'cancelled'],
            'Invalid status value.',
        )
        .default('pre-registration'),

    prerequisite: yup.string().nullable(), // Optional field, can be null or undefined
});

module.exports = {
    addCourseSchema,
    updateCourseSchema,
};
