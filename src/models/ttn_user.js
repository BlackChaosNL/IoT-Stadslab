const mongoose = require("mongoose");

module.exports = mongoose.model("ttn_user", new mongoose.Schema({
    ttn_user: String,
    ttn_secret: String,
    deletion_key: String,
    error: {
        type: Number,
        default: 0
    }
}));