const router = require("express").Router(),
	data = require("../models/data");

/**
 * @swagger
 * /sensors/:
 *   get:
 *     description: Gets a list of unique sensors.
 *     produces: application/json
 *     response:
 *       '200':
 *         description: Returns a list of unique sensors.
 *         schema:
 *           type: array
 */
router.get("/", (req, res) => {
	data.find({}).distinct('sensor_id', (err, sensordata) => {
		return res.json(sensordata);
	});
});

/**
 * @swagger
 * /sensors/{id}:
 *   get:
 *     description: Returns all data from specified sensor.
 *     produces: application/json
 *     response:
 *       200:
 *         description: Returns a list of unique sensors.
 *       404:
 *         description: Sensor could not be found.
 */
router.get("/:id", (req, res) => {
	data.find({ sensor_id: req.params.id }, (err, sensordata) => {
		if (err) return res.status(404).json({});
		if (sensordata == []) return res.status(404).json({});
		return res.json(sensordata);
	});
});

/**
 * @swagger
 * /sensors/{id}/newest:
 *   get:
 *     description: Returns last recieved data.
 *     produces: application/json
 *     response:
 *       200:
 *         description: Returns the latest data point from the requested sensor.
 *       404:
 *         description: Sensor could not be found.
 */
router.get("/:id/newest", (req, res) => {
	data.find({sensor_id: req.params.id}).sort('-sensor_time').limit(1).exec((error, sensordata) => {
		if (error) return res.status(404).json({ ok: false });
		if (sensordata == []) return res.status(404).json({ ok: false });
		return res.json(sensordata);
	});
});

/**
 * @swagger
 * /sensors/:
 *   post:
 *     description: Saves sensor data to the API.
 *     produces: application/json
 *     response:
 *       200:
 *         description: Returns whether the sensordata got saved.
 *       404:
 *         description: Sensor data could not be saved to the API.
 */

router.post("/", (req, res) => {
	data({
		sensor_id: req.body.sensor_id,
		sensor_data: req.body.sensor_data,
		sensor_time: (req.body.sensor_time) ? req.body.sensor_time : new Date
	}).save((error) => {
		return res.json({ ok: false });
	});
	return res.json({ ok: true });
});

module.exports = router;
