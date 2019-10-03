const router = require("express").Router(),
    data = require("../models/sensor"),
    obj = require("../lib/object");

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
        if (obj.isEmpty(dataset)) return res.status(404).json({
            "message": "No sensor data is present."
        });
        return res.json(dataset);
    });
}).post("/", (req, res) => {
    if (req.body.sensor_name == null ||
        req.body.sensor_id == null ||
        req.body.sensor_data == null) {
        return res.status(400).json({
            ok: false,
            message: "Please fill in the sensor name, id and data."
        });
    }

    if(!data.findOne({ sensor_name: req.body.sensor_name }).select({ _id: 1 }).lean().then(doc => !!doc)){
        data({
            sensor_name: req.body.sensor_name,
            sensor_id: req.body.sensor_id,
            sensor_data: [
                { data: req.body.sensor_data }
            ]
        }).save((error) => {
            if (error) return res.status(404).json({
                "message": error
            });
            return res.json({
                ok: true
            });
        });   
    } else {
        data.find({
            sensor_name: req.body.sensor_name
        }, (err, item) => {
            if (err) return res.status(404).json({
                "message": err
            });
            item.sensor_data.push(req.body.sensor_data);
            item.save();
        });
    }
    
});

/**
 * @swagger
 * '/v0/sensors/{id}':
 *   get:
 *     tags:
 *      - Sensors
 *     description: Returns all sensordata from this single node.
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
        if (obj.isEmpty(sensordata)) return res.status(404).json({
            "message": "Sensor could not be found."
        });
        return res.json(sensordata);
    });
});

/**
 * @swagger
 * '/v0/sensors/{name}/{sensor_id}':
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

router.get("/:id/:sensor_id", (req, res) => {
    data.find({
        sensor_name: req.params.id,
        sensor_id: req.params.sensor_id
    }, (err, sensordata) => {
        if (err) return res.status(404).json({
            "message": err
        });
        if (obj.isEmpty(sensordata)) return res.status(404).json({
            "message": "Could not find a node or sensor."
        });
        return res.json(sensordata);
    });
});


/**
 * @swagger
 * '/v0/sensors/{name}/{sensor_id}/{limit}':
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

router.get("/:id/:sensor_id/:limit", (req, res) => {
    let limit = isNaN(parseInt(req.params.limit)) ? 1 : req.params.limit;
    data.findOne({
        sensor_name: req.params.id,
        sensor_id: req.params.sensor_id
    }, { 'sensor_data': { $slice: -limit }}, (err, model) => {
        if (err) return res.status(404).json({ "message": err });
        if (obj.isEmpty(model)) return res.status(404).json({
            "message": "Could not find a node or sensor."
        });
        return res.json(model);
    });
});

module.exports = router;
