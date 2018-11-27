const mongoose = require("mongoose");

module.exports = mongoose.model("sensor", new mongoose.Schema({
    sensor_name: String,
    sensor_id: String,
    sensor_data: Number,
    sensor_time: {
        type: Date,
        default: Date.now
    }
}));