const app = require("../src/index");
const request = require("supertest");
const assert = require("chai").assert;

describe("Test Sensor endpoint", () => {
    it("Should display unique sensors", done => {
        request(app)
            .get("/v0/sensors")
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                assert.isArray(res.body);
                done();
            });
    });

    it("Should save sensor data", done => {
        request(app)
            .post("/v0/sensors")
            .send({
                sensor_name: "Woah",
                sensor_id: 0,
                sensor_data: 1234
            })
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                assert.isTrue(res.body.ok);
                done();
            });
    });

    it("Should return all sensor data", done => {
        request(app)
            .get("/v0/sensors/Woah")
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                assert.isArray(res.body);
                done();
            });
    });

    it("Should return specified sensor data", done => {
        request(app)
            .get("/v0/sensors/Woah/0")
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                assert.isArray(res.body);
                done();
            });
    });

    it("Should return newest harvested sensor data from a node", done => {
        request(app)
            .get("/v0/sensors/Woah/0/newest")
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                assert.isArray(res.body);
                done();
            });
    });

    it("Should not save sensor data when body is empty", done => {
        request(app)
            .post("/v0/sensors")
            .send({})
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                assert.isFalse(res.body.ok);
                assert.isString(res.body.message);
                done();
            });
    });
});