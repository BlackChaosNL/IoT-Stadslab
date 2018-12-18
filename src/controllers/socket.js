const router = require("express").Router(),
    obj = require("../lib/object");
/*
 * '/v0/sensors/{name}/{sensor_id}/newest/socket':
 *   get:
 *     tags:
 *      - Sensors
 *     description: Returns the latest data from specified sensor in a socket.
 *     produces: application/json
 *     responses:
 *       200:
 *         description: Returns the last recorded sensor data.
 *       404:
 *         description: Sensor or data could not be found.
 *         $ref: '#/definitions/NotFoundError'
 */

module.exports = router;