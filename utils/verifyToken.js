const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

const verifyToken = async (token) =>
    await promisify(jwt.verify)(token, secretKey);

module.exports = verifyToken;
