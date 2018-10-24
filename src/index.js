const port = process.env.PORT || 3000;
const client = process.env.ttnclient || null;
const password = process.env.ttnkey || null;
const controllerDirectory = "./controllers/";

// Require dependancies
const express = require("express"),
	swagger = require("swagger-jsdoc"),
	bp = require("body-parser"),
	cors = require("cors"),
	fs = require("fs"),
	path = require('path'),
	dist = require("../package.json"),
	serveStatic = require("serve-static"),
	ttn = require("ttn"),
	mongoose = require("mongoose"),
	data = require("./models/data");

let controllers = [];
mongoose.connect("mongodb://" + client + ":" + password + "@ds042677.mlab.com:42677/iotstadslab");
const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
app.use(cors());
app.options("*", cors());

fs.readdirSync(path.join(__dirname, "./controllers")).forEach(file => { controllers.push(file.split(".")[0]); });
controllers.forEach(controller => { app.use("/" + controller, require(controllerDirectory + controller)); });

app.get("/swagger", (req, res) => {
	return res.json(swagger({
		swaggerDefinition: {
			info: {
				title: "Hackaton IoT Dataweek",
				version: dist.version,
				description: dist.description || "Nondescript",
			},
			host: "iotstadslab.herokuapp.com:3000",
			basePath: "/",
		},
		apis: [ "src/controllers/*.js" ],
	}));
})

app.get("/", express.static(path.join(__dirname, 'static')));

app.use((req, res, next) => {
	res.status(404);
	res.json({
		ok: false,
		message: "The endpoint you requested was not found"
	});
	next();
});

app.use(serveStatic('public/html', {'index': ['default.html', 'default.htm']}))

if(client != null) {
	ttn.data(client, password).then(c => {
		c.on("uplink", (devId, payload) => {
			if(payload.dev_id != null) {
				const nd = data({
					sensor_id: payload.dev_id,
					sensor_data: payload.payload_raw.readInt8()
				});
				nd.save();
			}
		});
	}).catch(error => {
		console.log(error);
	});
}

app.listen(port, () => console.log("Starting the API on port " + port));

module.exports = app;
