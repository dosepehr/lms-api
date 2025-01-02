const multer = require('multer');
const path = require('path');

const uploader = (validExtensions, maxFileSize) => {
    const storage = multer.memoryStorage(); // Use memory storage for optional processing

    const fileFilter = (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (validExtensions.includes(ext)) {
            cb(null, true); // Accept the file
        } else {
            cb(
                new Error(
                    `Invalid file type. Allowed types: ${validExtensions.join(', ')}`,
                ),
                false,
            );
        }
    };

    return multer({
        storage,
        fileFilter,
        limits: {
            fileSize: maxFileSize,
        },
    });
};

module.exports = uploader;
