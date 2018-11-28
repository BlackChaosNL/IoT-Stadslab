const router = require("express").Router(),
    data = require("../models/sensor");

/**
 * @swagger
 *
 * '/v0/sensors/':
 *   get:
 *     tags:
 *      - Sensors
 *     description: Gets a list of unique sensors.
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Returns a list of unique sensors.
 *         schema:
 *           type: array
 *           $ref: '#/definitions/Sensor'
 *       '404':
 *         description: Sensors could not be found
 *         $ref: '#/definitions/NotFoundError'
 *
 *   post:
 *     tags:
 *      - Sensors
 *     description: Saves sensor data to the API.
 *     produces: application/json
 *     responses:
 *       '200':
 *         description: Returns whether the sensordata got saved.
 *         parameters:
 *           - name: Sensor
 *             description: Sensor Object
 *             in: body
 *             required: true
 *             schema:
 *               $ref: '#/definitions/Sensor'
 *       '404':
 *         description: Sensor data could not be saved to the API.
 *         $ref: '#/definitions/NotSavedError'
 */

router.get("/", (req, res) => {
    data.find({}).distinct('sensor_name', (error, dataset) => {
        if (error) return res.status(404).json({
            "message": error
        });
        return res.json(dataset);
    });
}).post("/", (req, res) => {
    sensor({
        sensor_id: req.body.sensor_id,
        sensor_data: req.body.sensor_data,
        sensor_time: req.body.sensor_time
    }).save((error) => {
        if (error) return res.status(404).json({
            "message": error
        });
        return res.json({
            ok: true
        });
    });
});

/**
 * @swagger
 * '/v0/sensors/{id}':
 *   get:
 *     tags:
 *      - Sensors
 *     description: Returns all data from specified sensor.
 *     produces: application/json
 *     responses:
 *       200:
 *         description: Returns a list of unique sensors.
 *       404:
 *         description: Sensor could not be found.
 *         $ref: '#/definitions/NotFoundError'
 */

router.get("/:id", (req, res) => {
    data.find({
        sensor_name: req.params.id
    }, (err, sensordata) => {
        if (err) return res.status(404).json({
            "message": err
        });
        if (sensordata === []) return res.status(404).json({});
        return res.json(sensordata);
    });
});

/**
 * @swagger
 * '/v0/sensors/{id}/newest':
 *   get:
 *     tags:
 *      - Sensors
 *     description: Returns last recieved data.
 *     produces: application/json
 *     responses:
 *       200:
 *         description: Returns the latest data point from the requested sensor.
 *       404:
 *         description: Sensor could not be found.
 *         $ref: '#/definitions/NotFoundError'
 * /sensors/{id}/newest/socket:
 *   get:
 *     tags:
 *      - Sensors
 *     description: Returns a bindable socket for Socket.IO to bind to.
 */

router.get("/:id/newest", (req, res) => {
    data.find({
        sensor_name: req.params.id
    }).sort('-sensor_time').limit(1).exec((error, sensordata) => {
        if (error) return res.status(404).json({
            "message": error
        });
        if (sensordata === []) return res.status(404).json({
            "message": ""
        });
        return res.json(sensordata);
    });
}).get("/:id/newest/socket", (req, res) => {
    data.watch().on('change', data => {
        return res.json(data);
    })
});


module.exports = router;