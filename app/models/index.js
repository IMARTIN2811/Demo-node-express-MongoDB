const ConfigDb = require("../config/db.config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = ConfigDb.url;
db.products = require("./products.model")(mongoose);

module.exports = db;