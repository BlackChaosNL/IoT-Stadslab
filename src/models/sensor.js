const mongoose = require("mongoose");

module.exports = mongoose.model("sensor", new mongoose.Schema({
    sensor_name: String,
    sensor_id: String,
    sensor_data: [{
        time: {
            type: Date,
            default: Date.now
        },
        data: Number
        }
    ],
    
}));