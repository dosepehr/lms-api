const path = require('path');
const fs = require('fs');
const expressAsyncHandler = require('express-async-handler');

const saveFile = expressAsyncHandler(async (req, res, next) => {
    if (!req.file) return next();
    // TODO add crypto here
    const filename = `${Date.now()}-${req.file.originalname}`;
    const outputPath = path.join('public/uploads', filename);

    fs.writeFileSync(outputPath, req.file.buffer);

    req.body[req.file.fieldname] = filename;
    next();
});

module.exports = saveFile;
