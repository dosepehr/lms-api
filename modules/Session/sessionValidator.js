const yup = require('yup');

const addSessionSchema = yup.object().shape({
    title: yup
        .string()
        .required('The title field is required.')
        .min(3, 'The title must be at least 3 characters long.')
        .max(50, 'The title must be at most 50 characters long.'),
    videoUrl: yup.string().required('The Video is required'),
    course: yup.string().required('The course is required'),
    videoDuration: yup
        .number('The videoDuration must be a number')
        .required('The videoDuration is required'),
});
const updateSessionSchema = yup.object().shape({
    title: yup
        .string()
        .required('The title field is required.')
        .min(3, 'The title must be at least 3 characters long.')
        .max(50, 'The title must be at most 50 characters long.'),
    videoUrl: yup.string().required('The video is required'),
    course: yup.string().required('The course is required'),
    videoDuration: yup
        .number('The videoDuration must be a number')
        .required('The videoDuration is required'),
});

module.exports = {
    addSessionSchema,
    updateSessionSchema,
};
