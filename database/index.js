const mongoose = require("mongoose");
const env = process.env;

const connectToDb = async () => {
  try {
    const connect = await mongoose.connect(env.DB_URL, {
      dbName: env.DB_NAME,
    });
    return connect;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = connectToDb;
