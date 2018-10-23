const router = require("express").Router();

/**
 * @swagger
 * /:
 *   get:
 *     description: Gets a list of unique sensors.
 *     produces: application/json
 *     response:
 *       200:
 *         description: Returns a list of unique sensors
 */
router.get("/", (req, res) => {
	return res.json({ ok: true });
});

module.exports = router;
