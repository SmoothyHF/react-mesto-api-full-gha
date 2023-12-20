const jwt = require('jsonwebtoken');
// const secret = require('../config').secret;
const { JWT_SECRET = 'SECRET_KEY' } = process.env;

const ForbiddenError = require('../errors/Forbidden-error');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(new ForbiddenError('Токен не рабочий'));
  }
  return jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    return next();
  });
};

module.exports = verifyToken;
