const router = require("express").Router(),
	data = require("../models/data");

/**
 * @swagger
 * /sensors/:
 *   get:
 *     description: Gets a list of unique sensors.
 *     produces: application/json
 *     response:
 *       200:
 *         description: Returns a list of unique sensors
 */
router.get("/", (req, res) => {
	return res.json(data.find().distinct('sensor_id', (err, data) => {
		console.log(data);
		return {ok: true};
		// return data;
	}));
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
	return res.json({ sensor_id: req.params.id }, (err, data) => {
		if (err) return res.status(404);
		if (!data) return res.status(404);
		return data;
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
	const sensor = data({
		sensor_id: req.body.sensor_id,
		sensor_data: req.body.sensor_data,
		sensor_time: (req.body.sensor_time) ? req.body.sensor_time : new Date
	});
	sensor.save((error) => {
		return res.json({ ok: false });
	})
	return res.json({ ok: false });
});

module.exports = router;
