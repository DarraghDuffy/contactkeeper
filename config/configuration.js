const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  MONGO_URI: process.env.CONTACT_KEEPER_MONGOURI,
  JWT_SECRET: process.env.CONTACT_KEEPER_JWT_SECRET,
  JWT_EXPIRES: process.env.CONTACT_KEEPER_JWT_EXPIRES,
};
