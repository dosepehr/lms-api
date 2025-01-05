const mongoose = require('mongoose');
const basketSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        courses: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Course',
            },
        ],
        purchased: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    },
);
const Basket = mongoose.model('Basket', basketSchema);

module.exports = Basket;
