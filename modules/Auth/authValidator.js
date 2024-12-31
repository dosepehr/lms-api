const yup = require('yup');

const signupUserSchema = yup.object().shape({
    name: yup
        .string()
        .required('The name field is required.')
        .min(3, 'The name must be at least 3 characters long.')
        .max(50, 'The name must be at most 50 characters long.'),
    username: yup
        .string()
        .required('The username field is required.')
        .min(3, 'The username must be at least 3 characters long.')
        .max(30, 'The username must be at most 30 characters long.'),

    email: yup
        .string()
        .email('Please provide a valid email address.')
        .required('The email field is required.'),

    photo: yup.string().default('pathToDefaultImage'),
    phone: yup
        .string()
        .required('The phone field is required.')
        .matches(
            /^\d{11}$/,
            'Phone number must be exactly 11 digits and contain only numbers.',
        ),

    password: yup
        .string()
        .min(8, 'The password must be at least 8 characters long.')
        .max(128, 'The password must be at most 128 characters long.'),

    confirmPassword: yup
        .string()
        .required('The confirm password field is required.')
        .oneOf([yup.ref('password')], 'Passwords must match.'),
});

const loginUserSchema = yup.object().shape({
    password: yup
        .string()
        .required('The password field is required.')
        .min(8, 'The password must be at least 8 characters long.'),
    identifier: yup
        .string()
        .required('The identifier field is required.'),
});

module.exports = { loginUserSchema, signupUserSchema };
