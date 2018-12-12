function hex2bin(hex) {
    return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}

function translateTtnPayload(ttnPayload) {
    var decodedPayload = "";
    var decodedNumbers = [];
    var sensorId = 0;

    ttnPayload.toString('hex').match(/.{1,2}/g).forEach(str => {
        decodedPayload += hex2bin(str);
    });

    decodedPayload.match(/.{15,16}/g).forEach(item => {
        decodedNumbers.push([sensorId, parseInt(item, 2).toString(10)]);
        sensorId += 1;
    });

    return decodedNumbers;
}

module.exports = {
    hex2bin,
    translateTtnPayload
};