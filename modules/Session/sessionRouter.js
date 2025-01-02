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
        uploader(
            [
                { name: 'source', validExtensions: ['.zip'] },
                { name: 'videoUrl', validExtensions: ['.mp4'] },
            ],
            7 * 1024 * 1024, // 7 MB size limit
        ).fields([
            { name: 'source', maxCount: 1 },
            { name: 'videoUrl', maxCount: 1 },
        ]),
        saveFile,
        addSession,
    );
sessionRouter
    .route('/:id')
    .get(getSession)
    .put(protect, restrictTo('admin'), updateSession)
    .delete(protect, restrictTo('admin'), deleteSession);

module.exports = sessionRouter;
