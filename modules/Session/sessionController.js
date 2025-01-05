const expressAsyncHandler = require('express-async-handler');
const {
    addOne,
    getAll,
    updateOne,
    deleteOne,
} = require('../Factory/factoryController');
const Basket = require('../Basket/basketModel');
const Session = require('./sessionModel');
const { addSessionSchema, updateSessionSchema } = require('./sessionValidator');

exports.addSession = addOne(Session, addSessionSchema);
exports.getSessions = getAll(Session, {}, [
    {
        path: 'course',
    },
]);

exports.getSession = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const data = await Session.findOne({ _id: id }).populate({
        path: 'course',
    });

    if (!data) {
        return res.status(404).json({
            status: false,
            message: 'Resource not found',
        });
    }
    // TODO handle user access to the course
    const checkUserAccess = async () => {
        const userBaskets = await Basket.find({
            user: req.user.id,
        });
        if (!userBaskets.length) {
            return false;
        }
        return userBaskets.some(
            (basket) =>
                basket.courses.includes(data.course.id) && basket.purchased,
        );
    };
    const hasAccess = await checkUserAccess();
    res.status(200).json({
        status: true,
        access: data.free || hasAccess,
        data,
    });
});

exports.updateSession = updateOne(Session, updateSessionSchema);
exports.deleteSession = deleteOne(Session);
