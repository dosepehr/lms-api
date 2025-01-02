const express = require('express');
const {
    addSession,
    getSessions,
    getSession,
    updateSession,
    deleteSession,
} = require('./sessionController');
const { protect, restrictTo } = require('../Auth/authController');
const uploader = require('../../utils/fileUploader');
const saveFile = require('../../utils/fileSaver');

const sessionRouter = express.Router();

sessionRouter
    .route('/')
    .get(getSessions)
    .post(
        protect,
        restrictTo('admin'),
        uploader(['.zip'], 7 * 1024 * 1024).single('source'),
        saveFile,
        addSession,
    );
sessionRouter
    .route('/:id')
    .get(getSession)
    .put(protect, restrictTo('admin'), updateSession)
    .delete(protect, restrictTo('admin'), deleteSession);

module.exports = sessionRouter;
