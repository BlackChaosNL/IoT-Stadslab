const app = require("../src/index");
const request = require("supertest");
const assert = require("chai").assert;

describe("Test The Things Network endpoints", () => {
    it("Should save the Things Network Credentials to the API", done => {
        request(app)
            .post("/v0/ttn/")
            .send({
                ttnclient: "Blablabla",
                ttnsecret: "Blablablablabla"
            })
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                done();
            });
    });

    it("Should find multiple Things Network Credentials", done => {
        request(app)
            .post("/v0/ttn/")
            .send({
                ttnclient: "Blablabla",
                ttnsecret: "Blablablablabla"
            })
            .send({
                ttnclient: "Blablabla",
                ttnsecret: "Blablablablabla"
            })
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                assert.isFalse(res.body.ok);
                assert.isString(res.body.message);
                done();
            });
    });
});