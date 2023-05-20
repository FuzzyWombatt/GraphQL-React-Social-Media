const { AuthenticationError } = require('apollo-server-express');
const Jwt = require('jsonwebtoken');

const data = require('../config/default.json');

//exporting as anymous function for middleware routing in express
module.exports = (context) => {
    const token = context.req.header('Authorization');

    if (!token) {
        throw new Error('Authentication denied, no token present');
    }

    try {
        const decoded = Jwt.verify(token, data.jwtsecret);

        return decoded.user;
    } catch (err) {
        throw new AuthenticationError('Invalid token');
    }
};
