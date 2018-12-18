const app = require("../src/index");
const request = require("supertest");
const assert = require("chai").assert;

describe("Test Global endpoints", () => {
    it("Should display ReDoc on /", done => {
        request(app)
            .get("/")
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                done();
            });
    });

    it("Should display the swagger endpoint", done => {
        request(app)
            .get("/v0/swagger")
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                assert.isObject(res.body, "getting a filled response back.");
                done();
            });
    });

    it("Should display a 404 when nothing is found", done => {
        request(app)
            .get("/asdohjasukiodhasuihdhui")
            .expect(404)
            .end((err, res) => {
                assert.ifError(err);
                assert.exists(res.body.message, "404 message does not show up.");
                done();
            });
    });
});