const Driver = require("../models/driver");

module.exports = {
  greetings(req, res) {
    res.send({ hi: "there" });
  },

  create(req, res) {
    const driverProp = req.body;
    Driver.create(driverProp).then((driver) => res.send(driver));
  },
};
