const mongoose = require("mongoose");

const connectDb = () =>
  mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Database connected successfully");
  });

module.exports = connectDb;
