const io = require("socket.io")(80);

function emit(node, json) {}

module.exports = {
    emit,
};