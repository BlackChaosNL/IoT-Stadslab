const mongoose = require("mongoose");

module.exports = mongoose.model("data", new mongoose.Schema({
  sensor_id: String,
  sensor_data: Number,
  sensor_time: {
    type: Date,
    default: Date.now
  }
}));