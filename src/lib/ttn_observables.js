const ttncreds = require("../models/ttn_user"),
  ttn = require("ttn");

function startAll() {
  ttncreds.find({}).then((users) => {
    if (users.length <= 0) return;
    users.forEach(u => {
      ttn.data(client, password).then(c => {
        c.on("uplink", (devId, payload) => {
          if (payload.dev_id == null) return;
          data({
            sensor_id: payload.dev_id,
            sensor_data: Buffer.from(payload.payload_raw, 'hex')[0],
            sensor_time: payload.metadata.time
          }).save().catch((error) => {
            console.error(error);
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
      data({
        sensor_id: payload.dev_id,
        sensor_data: Buffer.from(payload.payload_raw, 'hex')[0],
        sensor_time: payload.metadata.time
      }).save().catch((error) => {
        console.error(error);
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