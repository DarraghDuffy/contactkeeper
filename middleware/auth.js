const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES } = require('../config/configuration');

module.exports = function (req, res, next) {
  // Get token from the header
  const token = req.header('x-auth-token');
  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorisation denied' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    console.log(`User Logged-In:${req.user.id}`);
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
