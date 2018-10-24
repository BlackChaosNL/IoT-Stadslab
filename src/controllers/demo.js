const router = require("express").Router(),
	data = require("../models/data");

/**
 * @swagger
 * /demo/:
 *   get:
 *     description: Gets all data from the saved database.
 *     produces: application/json
 *     response:
 *       200:
 *         description: Returns a massive blob of information.
 */
router.get("/", (req, res) => {
	data.find({}, (err, data) => {
		return res.json(data);		
	});
});

module.exports = router;
