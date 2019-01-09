const app = require("../src/index");
const request = require("supertest");
const assert = require("chai").assert;
const ttn = require("../src/models/ttn_user");

before(() => {
    ttn({
        ttn_user: "Blablabla",
        ttn_secret: "Blablablablabla",
        deletion_key: "000001",
        error: 0
    }).save();
});

describe("Test The Things Network endpoints", () => {
    it("Should save the Things Network Credentials to the API", done => {
        request(app)
            .post("/v0/ttn/")
            .send({
                ttnclient: "Lalalalal",
                ttnsecret: "Blablablablabla"
            })
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                assert.isTrue(res.body.ok);
                assert.isString(res.body.deletion_key);
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
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                assert.isFalse(res.body.ok);
                assert.isString(res.body.message);
                done();
            });
    });

    it("Should warn about empty body when nothing is posted", done => {
        request(app)
            .delete("/v0/ttn/")
            .send({})
            .expect(404)
            .end((err, res) => {
                assert.ifError(err);
                assert.isFalse(res.body.ok);
                assert.isString(res.body.message);
                done();
            });
    });

    it("Should refuse deletion when the key is not known", done => {
        request(app)
            .delete("/v0/ttn/")
            .send({
                ttnclient: "Blablabla",
                deletion_key: "010001"
            })
            .expect(404)
            .end((err, res) => {
                assert.ifError(err);
                assert.isFalse(res.body.ok);
                assert.isString(res.body.message);
                done();
            });
    });


    it("Should remove TTN Credentials when deletion_key is known", done => {
        request(app)
            .delete("/v0/ttn/")
            .send({
                ttnclient: "Blablabla",
                deletion_key: "000001"
            })
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                assert.isTrue(res.body.ok);
                done();
            });
    });
});

afterEach(() => {
    ttn.deleteMany({ ttn_user: "Blablabla" });
});