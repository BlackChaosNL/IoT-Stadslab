const router = require("express").Router(),
    to = require("../lib/ttn_observables"),
    ttncreds = require("../models/ttn_user"),
    math = require("mathjs"),
    leftPad = require("left-pad"),
    obj = require("../lib/object");

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
    const ttnkey = req.body.ttnsecret;
    const del_key = leftPad(math.randomInt(1, 999999), 6, "0");

    if (ttnclient == null || ttnkey == null) return res.status(404).json({
        ok: false,
        message: "Fill in the ttnclient & ttnsecret keys"
    });

    ttncreds.countDocuments({
        ttn_user: ttnclient
    }, (error, count) => {
        if (count > 0) return res.json({
            ok: false,
            message: "Someone already pushed these the Things Network Credentials in."
        });
        ttncreds({
            ttn_user: ttnclient,
            ttn_secret: ttnkey,
            deletion_key: del_key,
            error: 0
        }).save((error) => {
            if (error) return res.status(404).json({
                ok: false,
                message: error
            });

            to.startOne(ttnclient, ttnkey);
    
            return res.json({
                ok: true,
                deletion_key: del_key
            });
        });
    });
}).delete("/", (req, res) => {
    const client = req.body.ttnclient;
    const dk = req.body.deletion_key;

    if (client == null || dk == null) return res.status(404).json({
        ok: false,
        message: "Please fill in ttnclient and deletion_key."
    });
    
    ttncreds.findOne({
        ttn_user: client
    }, (error, user) => {
        if (error) return res.status(500).json({ ok: false, message: error });
        if (obj.isEmpty(user)) return res.status(404).json({
            ok: false,
            message: "No user was found."
        });

        if(user.deletion_key == dk) {
            ttncreds.remove({ _id: user._id });
            return res.status(200).json({
                ok: true
            });
        }

        return res.status(404).json({
            ok: false,
            message: "Deletion key was wrong."
        });
    });
});

module.exports = router;