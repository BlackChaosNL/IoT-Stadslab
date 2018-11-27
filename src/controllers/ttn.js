const router = require("express").Router(),
    to = require("../lib/ttn_observables");

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
    if (this.body.ttnclient == null || this.body.ttnsecret == null) return res.status(404).json({
        "message": "Fill in the ttnclient & ttnsecret keys"
    });

    ttncreds.count({
        ttn_user: this.body.ttnclient
    }, (error, count) => {
        if (count > 0) return res.json({
            ok: false
        });
        ttncreds({
            ttn_user: this.body.ttnclient,
            ttn_secret: this.body.ttnsecret
        }).save((error) => {
            to.startOne(this.body.ttnclient, this.body.ttnsecret);
            return res.json({
                ok: true
            });
        }).catch((error) => {
            return res.status(404).json({
                ok: false
            });
        });
    });
}).delete("/", (req, res) => {});

module.exports = router;