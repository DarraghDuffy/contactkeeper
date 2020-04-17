const mongoose = require('mongoose');
const { MONGO_URI } = require('./configuration');

const connectDB = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('MongoDB Connected');
    })
    .catch((err) => {
      console.log(err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
