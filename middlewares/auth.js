const jwt = require('jsonwebtoken');
const { findUserById } = require('../models/user');
const { HttpError } = require('../helpers');

const { SECRET_KEY } = process.env;

const stripQuotes = value => value.replace(/^['"]|['"]$/g, '');

const normalizeToken = req => {
    console.log();
    
    const authorizationHeader =
        req.headers.authorization || req.headers.Authorization || req.headers['x-access-token'];

    if (!authorizationHeader) {
        return null;
    }

    const normalizedHeader = stripQuotes(String(authorizationHeader).trim());

    if (!normalizedHeader) {
        return null;
    }

    if (/^Bearer\s+/i.test(normalizedHeader)) {
        return stripQuotes(normalizedHeader.replace(/^Bearer\s+/i, '').trim());
    }

    if (normalizedHeader.includes(' ')) {
        return null;
    }

    return stripQuotes(normalizedHeader);
};

const authenticate = async (req, res, next) => {
    const token = normalizeToken(req);

    if (!token) {
        return next(HttpError(401, 'Not authorized'));
    }

    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await findUserById(id);

        if (!user || !user.token || user.token !== token) {
            return next(HttpError(401, 'Not authorized'));
        }
        req.user = user;
        return next();
    } catch {
        return next(HttpError(401, 'Not authorized'));
    }
};

module.exports = authenticate;
