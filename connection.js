const mongoose = require("mongoose");

const connectToDB = async (uri) => {
  return await mongoose.connect(uri);
};

module.exports = { connectToDB };
