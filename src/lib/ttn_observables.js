const ttncreds = require("../models/ttn_user");
const ttn = require("ttn");
const data = require("../models/sensor");
const supp = require("./ttn_support");
const socket = require("./sockets");
const obj = require("../lib/object");

function startAll() {
    ttncreds.find({}).then((users) => {
        if (users.length <= 0) return;
        users.forEach(u => {
            startOne(u.ttn_user, u.ttn_secret);
        });
    });
}

function startOne(client, password) {
    ttn.data(client, password).then(c => {
        c.on("uplink", (devId, payload) => {
            if (payload.dev_id == null) return;
            supp.translateTtnPayload(payload.payload_raw).forEach(item => {
                const dataset = {
                    sensor_name: payload.dev_id,
                    sensor_id: item[0],
                    sensor_data: {
                        time: payload.metadata.time,
                        data: item[1]
                    }
                };

                data.findOne({
                    sensor_name: payload.dev_id,
		    sensor_id: item[0]
                },(err, item) => {
                    if (obj.isEmpty(item)) {
                        data(dataset).save();
                    } else if (item.sensor_data && Array.isArray(item.sensor_data)) {
                        item.sensor_data.push(dataset.sensor_data);
                        item.save();
                    }
                });
                
                //socket.emit(payload.dev_id, { sensor_id: item[0], sensor_data: item[1] });
            });
        });
    }).catch(error => {
        errors = ttncreds.find({
            ttn_user: client
        });

        user = ttncreds.findOneAndUpdate({
            ttn_user: client
        }, {
            error: errors.error + 1
        });

        if (user.error > 4) {
            ttncreds.findOneAndDelete({
                ttn_user: client
            });
        }
    });
}

module.exports = {
    startAll,
    startOne
};
