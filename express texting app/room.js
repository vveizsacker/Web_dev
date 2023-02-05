const mongoose = require("mongoose");

scheme = new mongoose.Schema({
    roomid : String,
    users : []
});

module.exports = mongoose.model("Room",scheme);