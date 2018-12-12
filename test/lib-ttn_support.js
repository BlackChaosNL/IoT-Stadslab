const assert = require("chai").assert;
const ttnsupp = require("../src/lib/ttn_support");

describe("Test TTN support library", () => {
    it("Should translate hex to binary", done => {
        assert.equal("00001010", ttnsupp.hex2bin("0x0A"));
        assert.equal("00001001", ttnsupp.hex2bin("0x09"));
        assert.equal("10101001", ttnsupp.hex2bin("0xA9"));
        done();
    });

    it("Should translate recieved sensor data to readable numbers", done => {
        assert.equal(10, ttnsupp.translateTtnPayload(Buffer.from([0x00, 0x0A]))[0][1]);
        assert.equal(10, ttnsupp.translateTtnPayload(Buffer.from([0x00, 0x00, 0x00, 0x0A]))[1][1]);
        assert.equal(10, ttnsupp.translateTtnPayload(Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x0A]))[2][1]);
        assert.equal(10, ttnsupp.translateTtnPayload(Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0A]))[3][1]);
        assert.equal(10, ttnsupp.translateTtnPayload(Buffer.from([0x00, 0x00, 0x00, 0x0A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]))[1][1]);
        done();
    });
});