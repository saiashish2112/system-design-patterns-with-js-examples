const mongoose = require("mongoose");
require("dotenv").config();
class Database {
  constructor() {
    if (!Database.instance) {
      Database.instance = this;
      this._connect();
    }

    return Database.instance;
  }

  _connect() {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error");
      });
  }

  getConnection() {
    return this.getConnection;
  }
}

const instance = new Database();
Object.freeze(instance);
module.exports = instance;
