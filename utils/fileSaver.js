const path = require('path');
const fs = require('fs');
const expressAsyncHandler = require('express-async-handler');

const saveFile = expressAsyncHandler(async (req, res, next) => {
    if (!req.files) return next();

    for (const fieldName in req.files) {
        const file = req.files[fieldName][0]; // Each field has one file
        const filename = `${Date.now()}-${file.originalname}`;
        const outputPath = path.join('public/uploads', filename);

        // Write file from buffer to disk
        fs.writeFileSync(outputPath, file.buffer);

        // Attach file name to request body
        req.body[fieldName] = filename;
    }
    next();
});

module.exports = saveFile;
