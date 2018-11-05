const router = require("express").Router(),
  swagger = require("swagger-jsdoc"),
  dist = require("../../package.json");

/**
 * @swagger
 * /swagger:
 *   get:
 *     description: Gets the swagger documentation for the API.
 *     produces: application/json
 *     response:
 *       '200':
 *         description: Swagger documentation.
 *         schema:
 *           type: array
 */
router.get("/", (req, res) => {
  return res.json(swagger({
    swaggerDefinition: {
      info: {
        title: "Hackaton IoT Dataweek",
        version: dist.version,
        description: dist.description || "Nondescript",
      },
      host: "iotstadslab.herokuapp.com",
      basePath: "/",
    },
    apis: ["src/controllers/*.js"],
  }));
});

module.exports = router;