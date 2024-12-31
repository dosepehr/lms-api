const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        role: {
            type: String,
            enum: ['user', 'teacher', 'admin'],
            default: 'user',
        },
        photo: {
            type: String,
            default: 'pathToDefaultImage',
        },
        password: {
            type: String,
            required: true,
        },
        confirmPassword: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
            select: false,
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    },
);
userSchema.pre('save', function (next) {
    this.confirmPassword = undefined;
    if (!this.isModified('password')) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;
