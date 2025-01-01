const express = require('express');
const {
    addSession,
    getSessions,
    getSession,
    updateSession,
    deleteSession,
} = require('./sessionController');
const { protect, restrictTo } = require('../Auth/authController');

const sessionRouter = express.Router();

sessionRouter.route('/')
    .get(getSessions)
    .post(protect, restrictTo('admin'), addSession);
sessionRouter.route('/:id')
    .get(getSession)
    .put(protect, restrictTo('admin'), updateSession)
    .delete(protect, restrictTo('admin'), deleteSession);

module.exports = sessionRouter;
