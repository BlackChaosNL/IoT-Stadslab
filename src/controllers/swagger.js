const router = require("express").Router(),
    swagger = require("swagger-jsdoc"),
    dist = require("../../package.json");

/**
 * @swagger
 * '/v0/swagger':
 *   get:
 *     tags:
 *      - Swagger
 *     description: Gets the swagger documentation for the API.
 *     produces: application/json
 *     responses:
 *       200:
 *         description: Swagger documentation.
 */

router.get("/", (req, res) => {
    return res.json(swagger({
        swaggerDefinition: {
            info: {
                title: "API IoT Stadslab Den Bosch",
                version: dist.version,
                description: dist.description,
            },
            host: "185.232.255.1:3000",
            basePath: "/",
        },
        apis: ["./src/environment/apiDefinitions.yaml",
            "./src/controllers/*.js",
            "./src/controllers/**/*.js"
        ],
    }));
});

module.exports = router;