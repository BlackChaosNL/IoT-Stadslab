const mongoose = require("mongoose");

module.exports = mongoose.model("ttn_user", new mongoose.Schema({
  ttn_user: String,
  ttn_secret: String,
}));