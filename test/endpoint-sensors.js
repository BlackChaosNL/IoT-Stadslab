const app = require("../src/index");
const request = require("supertest");
const assert = require("chai").assert;
const sensor = require("../src/models/sensor");

before(() => {
    sensor({
        sensor_name: "iot_stadslab_node_1",
        sensor_id: 0,
        sensor_data: [{
	    data: 1234
	}, {
	    data: 1234
	}, {
	    data: 1234
	}, {
	    data: 1234
	}, {
	    data: 1234
	}
	]
    }).save();
});

describe("Test Sensor endpoint", () => {
    it("Should display unique sensors", done => {
        request(app)
            .get("/v0/sensors")
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                assert.isArray(res.body);
                assert.equal("iot_stadslab_node_1", res.body[0]);
                done();
            });
    }).timeout(5000);

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

    it("Should not save sensor data when body is empty", done => {
        request(app)
            .post("/v0/sensors")
            .send({})
            .expect(400)
            .end((err, res) => {
                assert.ifError(err);
                assert.isFalse(res.body.ok);
                assert.isString(res.body.message);
                done();
            });
    });

    it("Should return all sensor data", done => {
        request(app)
            .get("/v0/sensors/iot_stadslab_node_1")
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                assert.isArray(res.body);
                done();
            });
    });

    it("Should return an error when node is not found.", done => {
        request(app)
            .get("/v0/sensors/iot_stadslab_node_1123123")
            .expect(404)
            .end((err, res) => {
                assert.ifError(err);
                assert.isString(res.body.message);
                done();
            });
    });

    it("Should return specified sensor data", done => {
        request(app)
            .get("/v0/sensors/iot_stadslab_node_1/0")
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                assert.isArray(res.body);
                assert.isString(res.body[0].sensor_name, "Found a sensor");
                assert.equal("iot_stadslab_node_1", res.body[0].sensor_name);
                assert.equal(1234, res.body[0].sensor_data[0].data);
                done();
            });
    });

    it("Should not return specified sensor data when sensor is not found", done => {
        request(app)
            .get("/v0/sensors/iot_stadslab_node_1/9999")
            .expect(404)
            .end((err, res) => {
                assert.ifError(err);
                assert.isString(res.body.message);
                done();
            });
    });

    it("Should return specified sensor data", done => {
        request(app)
            .get("/v0/sensors/iot_stadslab_node_1/0")
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                assert.isArray(res.body);
                done();
            });
    });

    it("Should return a limited amount of sensor data", done => {
        request(app)
	    .get("/v0/sensors/iot_stadslab_node_1/0/3")
	    .expect(200)
	    .end((err, response) => {
	        assert.ifError(err);
		assert.isArray(res.body);
		assert.isArray(res.body.sensor_data);
		expect(res.body.sensor_data).to.have.length(3);
		done();
	    });
    });

    it("Should return newest harvested sensor data from a node", done => {
        request(app)
            .get("/v0/sensors/iot_stadslab_node_1/0/newest")
            .expect(200)
            .end((err, res) => {
                assert.ifError(err);
                assert.isArray(res.body);
                done();
            });
    });
});

after(() => {
    sensor.deleteMany({});
});
