const ttncreds = require("../models/ttn_user"),
    ttn = require("ttn"),
    data = require("../models/data"),
    supp = require("./ttn_support");

function startAll() {
    ttncreds.find({}).then((users) => {
        if (users.length <= 0) return;
        users.forEach(u => {
            ttn.data(client, password).then(c => {
                c.on("uplink", (devId, payload) => {
                    if (payload.dev_id == null) return;
                    supp.translateTtnPayload(payload.payload_raw).forEach(item => {
                        data({
                            sensor_name: payload.dev_id,
                            sensor_id: item[0],
                            sensor_data: item[1],
                            sensor_time: payload.metadata.time
                        }).save().catch((error) => {
                            console.error(error);
                        });
                    });
                });
            }).catch(error => {
                console.log(error);
            });
        });
    });
};

function startOne(client, password) {
    ttn.data(client, password).then(c => {
        c.on("uplink", (devId, payload) => {
            if (payload.dev_id == null) return;
            supp.translateTtnPayload(payload.payload_raw).forEach(item => {
                data({
                    sensor_name: payload.dev_id,
                    sensor_id: item[0],
                    sensor_data: item[1],
                    sensor_time: payload.metadata.time
                }).save().catch((error) => {
                    console.error(error);
                });
            });
        });
    }).catch(error => {
        console.log(error);
    });
};

module.exports = {
    startAll,
    startOne
};