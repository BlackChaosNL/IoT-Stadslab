const router = require("express").Router(),
    to = require("../lib/ttn_observables"),
    ttncreds = require("../models/ttn_user");

/**
 * @swagger
 * '/v0/ttn/':
 *   post:
 *     tags:
 *      - The Things Network
 *     description: Saves the Client and Secret of The Things Network to the database to scrape the sensor data.
 *     produces: application/json
 *     responses:
 *       200:
 *         description: Returns whether the sensordata got saved.
 *       404:
 *         description: Sensor data could not be saved to the API.
 *         $ref: '#/definitions/NotSavedError'
 *
 *   delete:
 *     tags:
 *      - The Things Network
 *     description: Removes the client and secret of The Things Network details.
 *     produces: application/json
 *     responses:
 *       200:
 *         description: Returns whether the client and secret have been removed.
 *       404:
 *         description: Data could not be found.
 *         $ref: '#/definitions/NotFoundError'
 */

router.post("/", (req, res) => {
    const ttnclient = req.body.ttnclient;
    const ttnkey = req.body.ttnkey;
    if (ttnclient == null || ttnkey == null) return res.status(200).json({
        "ok": false,
        "message": "Fill in the ttnclient & ttnsecret keys"
    });

    ttncreds.countDocuments({
        ttn_user: ttnclient
    }, (error, count) => {
        if (count > 0) return res.json({
            ok: false,
            message: "Someone already pushed these the Things Network Credentials in."
        });
    });

    ttncreds({
        ttn_user: ttnclient,
        ttn_secret: ttnkey
    }).save((error) => {
        return res.status(404).json({
            "message": error
        });
    });

    to.startOne(ttnclient, ttnkey);

    return res.json({
        ok: true
    });
}).delete("/", (req, res) => {});

module.exports = router;