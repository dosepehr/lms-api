const {
    addOne,
    getAll,
    getOne,
    updateOne,
    deleteOne,
} = require('../Factory/factoryController');
const Session = require('./sessionModel');
const { addSessionSchema, updateSessionSchema } = require('./sessionValidator');

exports.addSession = addOne(Session, addSessionSchema);
exports.getSessions = getAll(Session, {}, [
    {
        path: 'course',
    },
]);

exports.getSession = getOne(Session, {}, [
    {
        path: 'course',
    },
]);

exports.updateSession = updateOne(Session, updateSessionSchema);
exports.deleteSession = deleteOne(Session);
