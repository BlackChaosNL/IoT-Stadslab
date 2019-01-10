const io = require("socket.io")();

function emit(node, json) {
    io.of("/socket/" + node).on('connection', (socket) => {
        socket.emit(node, json);
    });
}

module.exports = {
    emit,
};