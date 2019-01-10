const ttncreds = require("../models/ttn_user"),
    ttn = require("ttn"),
    data = require("../models/sensor"),
    supp = require("./ttn_support");

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
                data({
                    sensor_name: payload.dev_id,
                    sensor_id: item[0],
                    sensor_data: item[1],
                    sensor_time: payload.metadata.time
                }).save();
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